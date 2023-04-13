import {RootState} from "../store";
import {INewGuide, INewGuideItem, INewGuideItemOption} from "../../models/newGuideInterface";
import {IBreadCrumb} from "../reducers/newGuide";


export const getNewGuideIsLoading = (state: RootState): boolean => {
    return state.newGuide.isLoading
}
export const getNewGuide = (state: RootState): INewGuide => {
    return state.newGuide.newGuide
}
export const getNewGuideItemById = (state: RootState, id: number): INewGuideItem => {
    return state.newGuide.newGuide.items.filter(item => item.id === id)[0]
}
export const getOptionsById = (state: RootState, id: number): INewGuideItemOption[] | [] => {
    return state.newGuide.newGuide.items.filter(item => item.id === id)[0].options
}
export const getBreadCrumbs = (state: RootState): IBreadCrumb[] | [] => {
    return state.newGuide.breadCrumbs
}