import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IGuide} from "../../models/guideInterface";
import {fetchAllGuides, fetchNewGuide, fetchRemoveGuide} from "../actions/guidesActionsCreators";
import {IGuideItem, INewGuide} from "../../models/newGuideInterface";

interface IGuideState {
    isLoading: boolean,
    errorMessage: string,
    isSelectedMyGuide: boolean,
    guides: IGuide[],
}

export const initialState: IGuideState = {
    isLoading: true,
    errorMessage: "",
    isSelectedMyGuide: false,
    guides: []
}

export const GuidesSlice = createSlice({
    name: 'guides',
    initialState,
    reducers: {
//        pushNewGuide: (state, action: PayloadAction<INewGuide>) => {
//            state.guides = [...state.guides, {...action.payload, id: Date.now()} ]
//        }
        setGuides: (state, action: PayloadAction<IGuide[] | []>) => {
            state.guides = action.payload
        },
        setIsGuidesLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        toggleIsSelectedMyGuide: (state) => {
            state.isSelectedMyGuide = !state.isSelectedMyGuide
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

export const {setGuides, setIsGuidesLoading, toggleIsSelectedMyGuide} = GuidesSlice.actions
export default GuidesSlice.reducer;