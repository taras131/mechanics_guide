import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api";
import {handlerError} from "./guidesActionsCreators";
import {INewComment} from "../../models/iComment";

export const fetchAddComment = createAsyncThunk(
    "fetch_add_comment",
    async (comment: INewComment, ThunkAPI) => {
        try {
            const res = await api.addComment(comment);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    }
);

export interface IUpdateLikes {
    commentId : string
    likedUsersId: string []
}
export const fetchUpdateCommentLikes = createAsyncThunk(
    "fetch_update_comment_like",
    async (updateLikes: IUpdateLikes, ThunkAPI) => {
        try {
            const res = await api.updateCommentLike(updateLikes);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    }
);