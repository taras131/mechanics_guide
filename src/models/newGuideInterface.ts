export interface INewGuideItemOption {
    text: string,
    nextId: number
}

export interface INewGuideItem {
    id: number,
    text: string,
    type: "result" | "question",
    options: null | INewGuideItemOption[]
}

export interface INewGuide {
    title: string
    items: INewGuideItem[]
}