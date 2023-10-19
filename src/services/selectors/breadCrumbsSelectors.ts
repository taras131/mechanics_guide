import {RootState} from "../store";
import {IBreadCrumb} from "../../models/iBreadCrumbs";

export const getBreadCrumbs = (state: RootState): IBreadCrumb[] | [] => {
    return state.breadCrumbs.list;
};
export const getLastBreadCrumbs = (state: RootState): IBreadCrumb | null => {
    return state.breadCrumbs.list[state.breadCrumbs.list.length - 1];
};

export const getBreadCrumbsCount = (state: RootState): number => {
    return state.breadCrumbs.list.length;
};


