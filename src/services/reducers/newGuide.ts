import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INewGuide, INewGuideItem} from "../../models/newGuideInterface";

interface INewGuideState {
    isLoading: boolean,
    newGuide: INewGuide
}

export const initialState: INewGuideState = {
    isLoading: false,
    newGuide:
        {
            title: "",
            items: [{id: 0, text: "", type: "question", options: null}]
        }

}

export const AuthSlice = createSlice({
    name: 'new_guide',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<INewGuideItem>) => {
            state.newGuide.items = [...state.newGuide.items, action.payload]
        },
        updateTitle: (state, action: PayloadAction<string>) => {
            state.newGuide.title = action.payload
        },
        updateText: (state, action: PayloadAction<{ id: number, text: string }>) => {
            state.newGuide.items = [...state.newGuide.items.map(item => {
                if (item.id === action.payload.id) return {...item, text: action.payload.text}
                return item
            })]
        },
        updateItemType: (state, action: PayloadAction<{ id: number, type: "result" | "question" }>) => {
            state.newGuide.items = [...state.newGuide.items.map(item => {
                if (item.id === action.payload.id) return {...item, type: action.payload.type}
                return item
            })]
        },
    },
    extraReducers: {}
})

export const {addItem, updateTitle,updateText, updateItemType} = AuthSlice.actions
export default AuthSlice.reducer;