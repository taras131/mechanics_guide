import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchAllGuides, fetchNewGuide, fetchRemoveGuide} from "../actions/guidesActionsCreators";
import {IGuide, IGuideCategory} from "../../models/iGuide";

interface IGuideState {
    isLoading: boolean,
    errorMessage: string,
    categories: IGuideCategory []
    guides: IGuide[],
}

export const initialState: IGuideState = {
    isLoading: true,
    errorMessage: "",
    categories: [],
    guides: []
}

export const GuidesSlice = createSlice({
    name: 'guides',
    initialState,
    reducers: {
        setGuides: (state, action: PayloadAction<IGuide[] | []>) => {
            state.guides = action.payload
        },
        setIsGuidesLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setGuideCategories: (state, action: PayloadAction<IGuideCategory[]>) => {
            state.categories= action.payload
        }

    },
    extraReducers: {
        [fetchAllGuides.fulfilled.type]: (state, action: PayloadAction<IGuide[]>) => {
            console.log(action.payload)
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
        [fetchNewGuide.fulfilled.type]: (state, action: PayloadAction<IGuide>) => {
            state.guides = [...state.guides, action.payload]
            state.isLoading = false;
        },
        [fetchNewGuide.pending.type]: (state) => {
            state.isLoading = true
            state.errorMessage = '';
        },
        [fetchNewGuide.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
        [fetchRemoveGuide.fulfilled.type]: (state, action: PayloadAction<IGuide>) => {
            state.isLoading = false;
        },
        [fetchRemoveGuide.pending.type]: (state) => {
            state.isLoading = true
            state.errorMessage = '';
        },
        [fetchRemoveGuide.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
    }
})

export const {setGuides, setIsGuidesLoading, setGuideCategories} = GuidesSlice.actions
export default GuidesSlice.reducer;