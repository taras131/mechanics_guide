import {RootState} from "../store";
import {IBreadCrumb} from "../reducers/breadCrumbs";

export const getBreadCrumbs = (state: RootState): IBreadCrumb[] | [] => {
    return state.breadCrumbs.list
}
export const getLastBreadCrumbs = (state: RootState): IBreadCrumb | null => {
    return state.breadCrumbs.list[state.breadCrumbs.list.length -1]
}