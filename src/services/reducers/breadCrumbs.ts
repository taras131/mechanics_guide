import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IBreadCrumb {
    text: string
    answer: string
    prevItemId: number
}

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
            console.log("reducer work")
            state.list = []
        }
    },
    extraReducers: {}
})

export const {
    addBreadCrumb,
    removeLastBreadCrumb,
    cleanBreadCrumbs
} = BreadCrumbsSlice.actions
export default BreadCrumbsSlice.reducer;