import {RootState} from "../store";
import {IComment} from "../../models/iComment";

export const getComments = (state: RootState): IComment[] => {
    return state.comments.list;
};
export const getCommentsIsLoading = (state: RootState): boolean => {
    return state.comments.isLoading;
};