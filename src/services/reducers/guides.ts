import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IGuide} from "../../models/guideInterface";
import {fetchAllGuides} from "../actions/guidesActionsCreators";

interface IGuideState {
    isLoading: boolean,
    errorMessage: string,
    guides: IGuide[],
}

export const initialState: IGuideState = {
    isLoading: false,
    errorMessage: "",
    guides: []
}

export const GuidesSlice = createSlice({
    name: 'guides',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAllGuides.fulfilled.type]: (state, action: PayloadAction<IGuide[]>) => {
            state.guides = action.payload
            state.isLoading = false;
        },
        [fetchAllGuides.pending.type]: (state) => {
            state.isLoading = true
            state.errorMessage = '';
        },
        [fetchAllGuides.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
    }
})

export const {} = GuidesSlice.actions
export default GuidesSlice.reducer;