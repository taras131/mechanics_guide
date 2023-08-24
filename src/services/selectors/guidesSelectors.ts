import {RootState} from "../store";
import {ALL_CATEGORIES, GUIDE_ITEM_TYPE, GUIDE_MODE} from "../../utils/const";
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
export const getGuideById = (state: RootState, id: string, guideMode: GUIDE_MODE) => {
    if (guideMode === GUIDE_MODE.editing || guideMode === GUIDE_MODE.new_guide) return state.guides.editionGuide
    return state.guides.guides.filter(item => item.id === id)[0]
}

export const getGuideStepById = (state: RootState, guideId: string, stepId: number, guideMode: GUIDE_MODE): IGuideItem | null => {
    if (guideMode === GUIDE_MODE.editing || guideMode === GUIDE_MODE.new_guide) {
        return state.guides.editionGuide.items.filter(item => item.id === stepId)[0]
    }
    const guide = getGuideById(state, guideId, guideMode)
    if (guide && guide.items) {
        return guide.items.filter(item => item.id === stepId)[0]
    }
    return null
}

export const getIsGuidesLoading = (state: RootState): boolean => {
    return state.guides.isLoading
}

export const getGuideCategories = (state: RootState): IGuideCategory[] => {
    const categories = [...state.guides.categories]
    categories.sort((a, b) => {
        const textA = a.categoryName.toUpperCase();
        const textB = b.categoryName.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    categories.unshift(ALL_CATEGORIES)
    return categories
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

export const getEditionGuideStepsByType = (state: RootState, type: GUIDE_ITEM_TYPE): IGuideItem [] => {
    return [...state.guides.editionGuide.items.filter(item => item.type === type)]
}

export const gitIsMyEditionGuide = (state: RootState): boolean => {
    if (!state.guides.editionGuide.authorId) return true
    if (state.auth.user.id === "" || state.guides.editionGuide.authorId !== state.auth.user.id) {
        return false
    } else {
        return true
    }
}

export const getGuidesTitlesWithGuideIdFilter = (state: RootState, guideId: string): string [] => {
    const filteredGuides = [...state.guides.guides.filter(guide => guide.id !== guideId)]
    return filteredGuides.map(guide => guide.title)
}
export const getIsUploadFileLoading = (state: RootState): boolean => {
    return state.guides.isUploadFileLoading
}
export const getGuideMode = (state: RootState) => {
    return state.guides.guideMode
}

