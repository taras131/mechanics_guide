import {GUIDE_ITEM_TYPE} from "../utils/const";

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

export interface INewGuide {
    title: string
    category: string
    items: IGuideItem[]
}