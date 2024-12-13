import {DBType, VideoTypes} from '../types/types';

export const video: VideoTypes = {
    id: Date.now() + Math.random(),
    title: 'back',
    author: 'serzh',
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date(Date.now() + 86400000).toISOString(),
    availableResolutions: null,
}

export const db: DBType = {
    videos: []
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB  = (dataset?: Partial<DBType>) => {
    if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
        db.videos = []
        return
    }

    // если что-то передано - то заменяем старые значения новыми
    db.videos = dataset.videos || db.videos
}