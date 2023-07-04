import {RootState} from "../store";
import {ALL_CATEGORIES} from "../../utils/const";
import {IGuide, IGuideCategory} from "../../models/iGuide";

export const getGuidesByCategory = (state: RootState, currentCategory: string): IGuide [] => {
    let guides = state.guides.guides
    return guides
}
export const getGuideById = (state: RootState, id: string) => {
    return state.guides.guides.filter(item => item.id === id)[0]
}

export const geiIsGuidesLoading = (state: RootState): boolean => {
    return state.guides.isLoading
}

export const getGuideCategories = (state: RootState): IGuideCategory[] => {
    return state.guides.categories
}

export const getGuideCategoryNameById = (state: RootState, categoryId: string): string => {
    return state.guides.categories.filter(category => category.id === categoryId)[0].categoryName
}

