import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IComment} from "../../models/iComment";
import {STRING_EMPTY} from "../../utils/const";

interface ICommentsState {
    list: IComment[]
    isLoading: boolean
    errorMessage: string
}

const initialState: ICommentsState = {
    list: [],
    isLoading: false,
    errorMessage: STRING_EMPTY,
};

export const CommentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setComments: (state, action: PayloadAction<IComment[]>) => {
            state.list = action.payload;
        },
        setCommentsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: {},
});

export const {
    setComments, setCommentsLoading,
} = CommentsSlice.actions;

export default CommentsSlice.reducer;