export interface INewComment {
    authorId: string
    guideId: string
    text: string
    likedUsersId: string[]
    dateCreation: string
}

export interface IComment extends INewComment {
    id: string
}

