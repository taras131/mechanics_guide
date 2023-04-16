import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INewGuide, IGuideItem} from "../../models/newGuideInterface";
import {GUIDE_ITEM_TYPE} from "../../utils/const";

export interface IBreadCrumb {
    text: string
    answer: string
    prevItemId: number
}

interface INewGuideState {
    isLoading: boolean,
    newGuide: INewGuide,
    breadCrumbs: IBreadCrumb [] | []
}

export const initialState: INewGuideState = {
    isLoading: false,
    newGuide:
        {
            title: "",
            category: "",
            items: [{id: 0, text: "", type: GUIDE_ITEM_TYPE.question, options: []}]
        },
    breadCrumbs: []
}

export const NewGuideSlice = createSlice({
    name: 'new_guide',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IGuideItem>) => {
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
        updateItemType: (state, action: PayloadAction<{ id: number, type: GUIDE_ITEM_TYPE }>) => {
            state.newGuide.items = [...state.newGuide.items.map(item => {
                if (item.id === action.payload.id) return {...item, type: action.payload.type}
                return item
            })]
        },
        addOption: (state, action: PayloadAction<{ id: number, text: string }>) => {
            const newItemId = state.newGuide.items.length
            let tempItems = [...state.newGuide.items.map(item => {
                if (item.id === action.payload.id) {
                    const newOptionId = item.options.length | 0
                    return {
                        ...item,
                        options: [...item.options, {id: newOptionId, text: action.payload.text, nextId: newItemId}]
                    }
                }
                return item
            })]
            tempItems = [...tempItems, {id: newItemId, text: "", type: GUIDE_ITEM_TYPE.question, options: []}]
            state.newGuide = {...state.newGuide, items: tempItems}
        },
        addBreadCrumb: (state, action: PayloadAction<IBreadCrumb>) => {
            state.breadCrumbs = [...state.breadCrumbs, action.payload]
        },
        removeLastBreadCrumb: (state) => {
            const tempState = [...state.breadCrumbs]
            tempState.pop()
            state.breadCrumbs = tempState
        },
    },
    extraReducers: {}
})

export const {
    addItem,
    updateTitle,
    updateText,
    updateItemType,
    addOption,
    addBreadCrumb,
    removeLastBreadCrumb
} = NewGuideSlice.actions
export default NewGuideSlice.reducer;