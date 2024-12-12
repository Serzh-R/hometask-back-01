
export type DBType = {
    videos: VideoTypes[]
}

export type FieldError = {
    message: string | null
    field: string | null
}

export type APIErrorResult = {
    errorsMessages: FieldError[] | null
}

export enum ResolutionsEnam {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160",
}

export type CreateVideoInputModel = {
    title: string
    author: string
    availableResolutions: ResolutionsEnam[] | null
};

export type UpdateVideoInputModel = {
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    publicationDate: string
    availableResolutions: ResolutionsEnam[] | null
};

export type VideoTypes = {
    id?: number
    title: string
    author: string
    canBeDownloaded?: boolean
    minAgeRestriction?: number | null
    createdAt?: string
    publicationDate?: string
    availableResolutions?: ResolutionsEnam[] | null
}
