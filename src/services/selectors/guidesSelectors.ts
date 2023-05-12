import {RootState} from "../store";
import {IGuide} from "../../models/guideInterface";
import {ALL_CATEGORIES} from "../../utils/const";

export const getGuidesByCategory = (state: RootState, currentCategory: string): IGuide [] => {
    if (currentCategory === ALL_CATEGORIES) {
        return state.guides.guides
    } else {
        return state.guides.guides.filter(guide => guide.category === currentCategory)
    }

}
export const getGuideById = (state: RootState, id: string) => {
    return state.guides.guides.filter(item => item.id === id)[0]
}
export const getGuideItemById = (state: RootState, guideId: string, itemId: number) => {
    const guideItems = getGuideById(state, guideId).items
    return guideItems.filter(item => item.id === itemId)[0]
}

export const geiIsGuidesLoading = (state: RootState) => {
    return state.guides.isLoading
}