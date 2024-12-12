import {Router, Request, Response} from 'express';
import {db} from '../db/db';
import {
    authorFieldValidator,
    availableResolutionsFieldValidator,
    canBeDownloadedFieldValidator,
    minAgeRestrictionFieldValidator,
    publicationDateFieldValidator,
    titleFieldValidator
} from '../validation/fieldValidator';
import {errorResponse} from '../validation/errorResponse';
import {HTTP_STATUSES} from '../settings';
import {CreateVideoInputModel, UpdateVideoInputModel} from '../types/types';


export const videoRouter = Router({})

export const videoController = {
    getVideo (req: Request, res: Response) {
        const videos = db.videos
        res.status(HTTP_STATUSES.OK_200).json(videos)
    },

    createVideo (req: Request, res: Response) {

        const body: CreateVideoInputModel = req.body;
        const { title, author, availableResolutions } = body

        const errorsArray: Array<{field: string, message: string}> = []
        titleFieldValidator(title, errorsArray)
        authorFieldValidator(author, errorsArray)
        availableResolutionsFieldValidator(availableResolutions, errorsArray)

        if (errorsArray.length > 0) {
            const errors_ = errorResponse(errorsArray)
            res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors_)
            return
        }

        const video = {
            id: Date.now() + Math.random(),
            title,
            author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + 86400000).toISOString(),
            availableResolutions,
        }

        db.videos = [...db.videos, video]
        res.status(HTTP_STATUSES.CREATED_201).json(video)
    },

    getVideoById(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(HTTP_STATUSES.BAD_REQUEST_400).json({ message: 'Invalid video ID' });
            return;
        }

        const video = db.videos.find((video) => video.id === id);

        if (!video) {
            res.status(HTTP_STATUSES.NOT_FOUND_404).json({ message: 'Video not found' });
            return;
        }

        res.status(HTTP_STATUSES.OK_200).json(video);
    },

    updateVideo(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(HTTP_STATUSES.BAD_REQUEST_400).json({ message: 'Invalid video ID' });
            return;
        }

        const videoIndex = db.videos.findIndex((video) => video.id === id);

        if (videoIndex === -1) {
            res.status(HTTP_STATUSES.NOT_FOUND_404).json({ message: 'Video not found' });
            return;
        }

        const body: UpdateVideoInputModel = req.body;
        const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = body

        const errorsArray: Array<{ field: string; message: string }> = [];
        titleFieldValidator(title, errorsArray);
        authorFieldValidator(author, errorsArray);
        availableResolutionsFieldValidator(availableResolutions, errorsArray);
        canBeDownloadedFieldValidator(canBeDownloaded, errorsArray);
        minAgeRestrictionFieldValidator(minAgeRestriction, errorsArray);
        publicationDateFieldValidator(publicationDate, errorsArray);

        if (errorsArray.length > 0) {
            const errors_ = errorResponse(errorsArray);
            res.status(400).json(errors_);
            return;
        }

        const updatedVideo = {
            ...db.videos[videoIndex],
            title,
            author,
            availableResolutions,
            canBeDownloaded,
            minAgeRestriction,
            publicationDate,
        };

        db.videos[videoIndex] = updatedVideo

        res.status(HTTP_STATUSES.NO_CONTENT_204).send()
    },

    deleteVideo(req: Request, res: Response) {
        const { id } = req.params;

        const videoIndex = db.videos.findIndex((video) => video.id === +id);

        if (videoIndex === -1) {
            res.status(HTTP_STATUSES.NOT_FOUND_404).json({ message: 'Video not found' });
            return;
        }

        db.videos.splice(videoIndex, 1)

        res.status(HTTP_STATUSES.NO_CONTENT_204).send()
    },

}

videoRouter.get('/', videoController.getVideo)
videoRouter.post('/', videoController.createVideo)
videoRouter.get('/:id', videoController.getVideoById)
videoRouter.put('/:id', videoController.updateVideo)
videoRouter.delete('/:id', videoController.deleteVideo)



