import {RootState} from "../store";
import {INewGuide, IGuideItem, IGuideItemOption} from "../../models/newGuideInterface";
import {GUIDE_ITEM_TYPE} from "../../utils/const";

export const getNewGuideIsLoading = (state: RootState): boolean => {
    return state.newGuide.isLoading
}
export const getNewGuide = (state: RootState): INewGuide => {
    return state.newGuide.newGuide
}
export const getNewGuideItemById = (state: RootState, id: number): IGuideItem => {
    return state.newGuide.newGuide.items.filter(item => item.id === id)[0]
}
export const getOptionsById = (state: RootState, id: number): IGuideItemOption[] | [] => {
    return state.newGuide.newGuide.items.filter(item => item.id === id)[0].options
}
export const getNewGuideResultItems = (state: RootState): IGuideItem [] => {
    return state.newGuide.newGuide.items.filter(item => item.type === GUIDE_ITEM_TYPE.result)
}
