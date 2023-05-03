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
export const getNextGuideItemIdByOptionId = (state: RootState, guideItemId: number, optionId: number): number => {
    let nextGuideItemId = 0
    state.newGuide.newGuide.items.forEach(item => {
        if(item.id === guideItemId) {
            item.options.forEach(option => {
                if (option.id === optionId) {
                    nextGuideItemId = option.nextId
                }
            })
        }
    })
    return nextGuideItemId
}

