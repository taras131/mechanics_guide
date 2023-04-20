import {RootState} from "../store";
import {IGuide} from "../../models/guideInterface";

export const getAllGuides = (state: RootState): IGuide [] => {
    return state.guides.guides
}
export const getGuideById = (state: RootState, id: string) => {
    return state.guides.guides.filter(item => item.id === id)[0]
}
export const getGuideItemById = (state: RootState, guideId: string, itemId: number) => {
    const guideItems = getGuideById(state,guideId).items
    return guideItems.filter(item => item.id === itemId)[0]
}

export const geiIsGuidesLoading = (state: RootState) => {
    return state.guides.isLoading
}