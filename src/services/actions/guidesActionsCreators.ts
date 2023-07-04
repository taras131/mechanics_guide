import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api";
import {IGuide} from "../../models/iGuide";

export const handlerError = (e: any) => {
    if (e instanceof Error && e.message) return e.message;
    return 'неизвестная ошибка';
}

export const fetchAllGuides = createAsyncThunk(
    'fetch_all_guides',
    async (_, ThunkAPI) => {
        try {
            const res = await api.getAllGuides()
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)
export const fetchNewGuide = createAsyncThunk(
    'fetch_new_guide',
    async (guide: IGuide, ThunkAPI) => {
        try {
            const res = await api.addNewGuide(guide)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)
export const fetchRemoveGuide = createAsyncThunk(
    'fetch_remove_guide',
    async (guideId: string, ThunkAPI) => {
        try {
            const res = await api.removeGuide(guideId)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)
export const fetchUpdateGuide = createAsyncThunk(
    'update_guide',
    async (guide: IGuide, ThunkAPI) => {
        try {
            const res = await api.updateGuide(guide)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)