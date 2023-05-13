import {RootState} from "../store";
import {IGuide} from "../../models/guideInterface";
import {ALL_CATEGORIES} from "../../utils/const";

export const getGuidesByCategory = (state: RootState, currentCategory: string): IGuide [] => {
    let guides = []
    if (currentCategory === ALL_CATEGORIES) {
        guides = state.guides.guides
    } else {
        guides = state.guides.guides.filter(guide => guide.category === currentCategory)
    }
    if (state.guides.isSelectedMyGuide && state.auth.user && state.auth.user.id) {
        return guides.filter(guide => guide.authorId === state.auth.user.id)
    } else {
        return guides
    }
}
export const getGuideById = (state: RootState, id: string) => {
    return state.guides.guides.filter(item => item.id === id)[0]
}
export const getGuideItemById = (state: RootState, guideId: string, itemId: number) => {
    const guideItems = getGuideById(state, guideId).items
    return guideItems.filter(item => item.id === itemId)[0]
}
export const geiIsGuidesLoading = (state: RootState): boolean => {
    return state.guides.isLoading
}
export const geiIsSelectedMyGuide = (state: RootState): boolean => {
    return state.guides.isSelectedMyGuide
}