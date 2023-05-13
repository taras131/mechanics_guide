import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/authInterface";
import {fetchAllGuides} from "../actions/guidesActionsCreators";
import {IGuide} from "../../models/guideInterface";
import {fetchLogin, fetchOut, fetchRegister} from "../actions/authActionsCreators";

export interface IAuthState {
    errorMessage: string
    isLoading: boolean
    isAuth: boolean
    user: IUser
}

const initialState: IAuthState = {
    errorMessage: "",
    isLoading: false,
    isAuth: false,
    user: {
        id: "",
        email: ""
    }
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
    },
    extraReducers: {
        [fetchLogin.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAuth = true
            state.isLoading = false;
        },
        [fetchLogin.pending.type]: (state) => {
            state.isLoading = true
            state.errorMessage = '';
        },
        [fetchLogin.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
        [fetchRegister.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isAuth = true
            state.user = action.payload
            state.isLoading = false;
        },
        [fetchRegister.pending.type]: (state) => {
            state.isLoading = true
            state.errorMessage = '';
        },
        [fetchRegister.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;

        },
        [fetchOut.fulfilled.type]: (state) => {
            state.isAuth = false
            state.user = { id: "",email: ""}
            state.isLoading = false;
        },
        [fetchOut.pending.type]: (state) => {
            state.isLoading = true
            state.errorMessage = '';
        },
        [fetchOut.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
    }
})

export const {
    setIsAuth
} = AuthSlice.actions
export default AuthSlice.reducer;