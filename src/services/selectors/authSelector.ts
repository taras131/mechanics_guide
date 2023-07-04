import {RootState} from "../store";
import {IUser} from "../../models/iAuth";

export const getIsAuth= (state: RootState): boolean => {
    return state.auth.isAuth
}
export const getUser = (state: RootState): IUser => {
    return state.auth.user
}
export const getIsAuthLoading = (state: RootState): boolean => {
    return state.auth.isLoading
}