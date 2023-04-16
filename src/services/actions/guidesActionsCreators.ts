import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api";

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