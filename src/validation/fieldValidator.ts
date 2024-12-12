import {ResolutionsEnam} from '../types/types';

export const titleFieldValidator = (
    title: string | undefined,
    errorsArray: Array<{field: string, message: string}>
) => {

    if (!title) {
        errorsArray.push({
            field: 'title',
            message: 'no title'
        });
    }

    if (title && title.trim().length > 40) {
        errorsArray.push({
            field: 'title',
            message: 'more than 40 symbols'
        });
    }
    if (title && title.trim().length < 1) {
        errorsArray.push({
            field: 'title',
            message: 'no title'
        });
    }
}

export const authorFieldValidator = (
    author: string | undefined,
    errorsArray: Array<{ field: string, message: string }>
) => {
    if (!author) {
        errorsArray.push({
            field: 'author',
            message: 'no author'
        });
    }

    if (author && author.trim().length > 20) {
        errorsArray.push({
            field: 'author',
            message: 'more than 20 symbols'
        });
    }

    if (author && author.trim().length < 1) {
        errorsArray.push({
            field: 'author',
            message: 'no author'
        });
    }
};

export const availableResolutionsFieldValidator = (
    availableResolutions: ResolutionsEnam[] | null,
    errorsArray: Array<{field: string, message: string}>
) => {
    if (availableResolutions && availableResolutions.length) {
        availableResolutions.forEach((resolution: string) => {
            if (!Object.keys(ResolutionsEnam).includes(resolution)) {
                errorsArray.push({
                    field: 'availableResolutions',
                    message: 'exist not valid value'
                })
                return
            }
        })
    }
}

export const canBeDownloadedFieldValidator = (
    canBeDownloaded: boolean | undefined,
    errorsArray: Array<{ field: string, message: string }>
) => {
    if (typeof canBeDownloaded !== 'boolean') {
        errorsArray.push({
            field: 'canBeDownloaded',
            message: 'must be a boolean value'
        });
    }
};

export const minAgeRestrictionFieldValidator = (
    minAgeRestriction: number | null | undefined,
    errorsArray: Array<{ field: string, message: string }>
) => {
    if (minAgeRestriction !== null && typeof minAgeRestriction !== 'number') {
        errorsArray.push({
            field: 'minAgeRestriction',
            message: 'must be a number or null'
        });
        return;
    }

    if (minAgeRestriction !== null && (minAgeRestriction < 1 || minAgeRestriction > 18)) {
        errorsArray.push({
            field: 'minAgeRestriction',
            message: 'must be between 1 and 18 or null'
        });
    }
};

export const publicationDateFieldValidator = (
    publicationDate: string | undefined,
    errorsArray: Array<{ field: string, message: string }>
) => {
    if (!publicationDate) {
        errorsArray.push({
            field: 'publicationDate',
            message: 'no publication date'
        });
        return;
    }

    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    if (!isoDateRegex.test(publicationDate)) {
        errorsArray.push({
            field: 'publicationDate',
            message: 'must be in ISO 8601 format'
        });
    }
};
