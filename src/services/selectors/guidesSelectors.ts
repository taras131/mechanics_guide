import {RootState} from "../store";
import {ALL_CATEGORIES, GUIDE_ITEM_TYPE} from "../../utils/const";
import {IGuide, IGuideCategory, IGuideItem} from "../../models/iGuide";

export const getGuidesWithFilter = (state: RootState,
                                    selectedGuideCategoryId: string,
                                    isSelectedMyGuides: boolean): IGuide [] => {
    let guides = state.guides.guides
    if (selectedGuideCategoryId !== ALL_CATEGORIES.id) {
        guides = [...guides.filter(guide => guide.categoryId === selectedGuideCategoryId)]
    }
    if (isSelectedMyGuides && state.auth.user.id) {
        guides = [...guides.filter(guide => guide.authorId === state.auth.user.id)]
    }
    return guides
}
export const getGuideById = (state: RootState, id: string, isEdit: boolean, isNewGuide: boolean) => {
    if (isEdit || isNewGuide) return state.guides.editionGuide
    return state.guides.guides.filter(item => item.id === id)[0]
}

export const getGuideStepById = (state: RootState, guideId: string, stepId: number, isEdit: boolean, isNewGuide: boolean): IGuideItem => {
    if (isEdit || isNewGuide) return state.guides.editionGuide.items.filter(item => item.id === stepId)[0]
    return getGuideById(state, guideId, isEdit, isNewGuide).items.filter(item => item.id === stepId)[0]
}

export const geiIsGuidesLoading = (state: RootState): boolean => {
    return state.guides.isLoading
}

export const getGuideCategories = (state: RootState): IGuideCategory[] => {
    return state.guides.categories
}

export const getGuideCategoryNameById = (state: RootState, categoryId: string): string => {
    let categoryName = "подождите"
    if (state.guides.categories.filter(category => category.id === categoryId)[0]) {
        categoryName = state.guides.categories.filter(category => category.id === categoryId)[0].categoryName
    }
    return categoryName
}
export const getCountGuideSteps = (state: RootState, guideId: string, isEdit?: boolean, isNewGuide?: boolean) => {
    if (isEdit || isNewGuide) return state.guides.editionGuide.items.length
    return state.guides.guides.filter(guide => guide.id === guideId)[0].items.length
}
export const getIsEdit = (state: RootState) => {
    return state.guides.isEdit
}

export const getEditionGuideStepsByType = (state: RootState, type: GUIDE_ITEM_TYPE): IGuideItem [] => {
    return [...state.guides.editionGuide.items.filter(item => item.type === type)]
}
export const getIsNewGuide = (state: RootState): boolean => {
    return state.guides.isNewGuideEdition
}
