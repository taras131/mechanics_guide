import {GUIDE_ITEM_TYPE} from "../utils/const";

export interface IGuideCategory {
    id: string,
    categoryName: string
}

export interface IGuideItemOption {
    id: number
    text: string,
    nextId: number,
    redirectAnotherGuide? :string
}

export interface IFile {
    name: string
    path: string
}

export interface IGuideItem {
    id: number,
    text: string,
    type: GUIDE_ITEM_TYPE,
    file?: IFile
    options: IGuideItemOption[] | []
}

export interface IGuide {
    id: string
    title: string
    categoryId: string
    authorId: string
    items: IGuideItem[]
}