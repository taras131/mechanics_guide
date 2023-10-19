import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBreadCrumb} from "../../models/iBreadCrumbs";

interface IBreadCrumbsState {
    list: IBreadCrumb [] | []
}

const initialState: IBreadCrumbsState = {
    list: [],
};

export const BreadCrumbsSlice = createSlice({
    name: "bread_crumbs",
    initialState,
    reducers: {
        addBreadCrumb: (state, action: PayloadAction<IBreadCrumb>) => {
            state.list = [...state.list, action.payload];
        },
        removeLastBreadCrumb: (state) => {
            const tempState = [...state.list];
            tempState.pop();
            state.list = tempState;
        },
        cleanBreadCrumbs: (state) => {
            state.list = [];
        },
        setBreadCrumbs: (state, action: PayloadAction<IBreadCrumb[]>) => {
            state.list = action.payload;
        },
        cutBreadCrumbs: (state, action: PayloadAction<number>) => {
            state.list = [...state.list.filter((item, index) => index < action.payload)];
        },
    },
    extraReducers: {},
});

export const {
    addBreadCrumb,
    removeLastBreadCrumb,
    cleanBreadCrumbs,
    setBreadCrumbs,
    cutBreadCrumbs,
} = BreadCrumbsSlice.actions;
export default BreadCrumbsSlice.reducer;