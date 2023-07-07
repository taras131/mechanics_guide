import {GUIDE_ITEM_TYPE} from "../utils/const";

export interface IGuideCategory {
    id: string,
    categoryName: string
}

export interface IGuideItemOption {
    id: number
    text: string,
    nextId: number
}

export interface IGuideItem {
    id: number,
    text: string,
    type: GUIDE_ITEM_TYPE,
    options: IGuideItemOption[] | []
}

export interface IGuide {
    id: string
    title: string
    categoryId: string
    authorId: string
    items: IGuideItem[]
}