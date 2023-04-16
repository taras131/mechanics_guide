import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api";
import {INewGuide} from "../../models/newGuideInterface";

const handlerError = (e: any) => {
    if (e instanceof Error && e.message) return e.message;
    return 'неизвестная ошибка';
}

export const fetchAllGuides = createAsyncThunk(
    'fetch_all_guides',
    async (_, ThunkAPI) => {
        try {
            const res = await api.getAllIngredients()
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)
export const fetchNewGuide = createAsyncThunk(
    'fetch_new_guide',
    async (guide: INewGuide, ThunkAPI) => {
        try {
            const res = await api.addNewGuide(guide)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)