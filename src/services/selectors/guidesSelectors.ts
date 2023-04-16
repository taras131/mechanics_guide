import {RootState} from "../store";

export const getAllGuides = (state: RootState) => {
    return state.guides.guides
}
export const getGuideById = (state: RootState, id: number) => {
    return state.guides.guides.filter(item => item.id === id)[0]
}

export const geiIsGuidesLoading = (state: RootState) => {
    return state.guides.isLoading
}