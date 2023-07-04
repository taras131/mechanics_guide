import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api";
import {handlerError} from "./guidesActionsCreators";
import {IAuthData} from "../../models/iAuth";

export const fetchLogin = createAsyncThunk(
    'fetch_login',
    async (authData: IAuthData, ThunkAPI) => {
        try {
            const res = await api.login(authData)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)

export const fetchRegister = createAsyncThunk(
    'fetch_register',
    async (authData: IAuthData, ThunkAPI) => {
        try {
            const res = await api.register(authData)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)

export const fetchOut = createAsyncThunk(
    'fetch_out',
    async (_, ThunkAPI) => {
        try {
            const res = await api.out()
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)