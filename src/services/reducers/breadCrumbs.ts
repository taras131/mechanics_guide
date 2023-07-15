import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBreadCrumb} from "../../models/iBreadCrumbs";

interface IBreadCrumbsState {
    list: IBreadCrumb [] | []
}

const initialState: IBreadCrumbsState = {
    list: []
}

export const BreadCrumbsSlice = createSlice({
    name: 'bread_crumbs',
    initialState,
    reducers: {
        addBreadCrumb: (state, action: PayloadAction<IBreadCrumb>) => {
            state.list = [...state.list, action.payload]
        },
        removeLastBreadCrumb: (state) => {
            const tempState = [...state.list]
            tempState.pop()
            state.list = tempState
        },
        cleanBreadCrumbs: (state) => {
            state.list = []
        },
        setBreadCrumbs: (state, action: PayloadAction<IBreadCrumb[]>) => {
            state.list = action.payload
        }
    },
    extraReducers: {}
})

export const {
    addBreadCrumb,
    removeLastBreadCrumb,
    cleanBreadCrumbs,
    setBreadCrumbs
} = BreadCrumbsSlice.actions
export default BreadCrumbsSlice.reducer;