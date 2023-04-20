import {RootState} from "../store";
import {IBreadCrumb} from "../reducers/breadCrumbs";

export const getBreadCrumbs = (state: RootState): IBreadCrumb[] | [] => {
    return state.breadCrumbs.list
}