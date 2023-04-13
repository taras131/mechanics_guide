export interface INewGuideItemOption {
    id: number
    text: string,
    nextId: number
}

export interface INewGuideItem {
    id: number,
    text: string,
    type: "result" | "question",
    options: INewGuideItemOption[] | []
}

export interface INewGuide {
    title: string
    items: INewGuideItem[]
}