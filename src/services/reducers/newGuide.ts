import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INewGuide, IGuideItem} from "../../models/newGuideInterface";
import {GUIDE_ITEM_TYPE} from "../../utils/const";


interface INewGuideState {
    isLoading: boolean,
    newGuide: INewGuide,
    errorMessage: string,
}

export const initialState: INewGuideState = {
    isLoading: false,
    newGuide:
        {
            title: "",
            category: "",
            items: [{id: 0, text: "", type: GUIDE_ITEM_TYPE.question, options: []}]
        },
    errorMessage: ""
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
        setCategory: (state, action: PayloadAction<string>) => {
            state.newGuide.category = action.payload
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
        changeNextIdFromNewGuideItem: (state, action: PayloadAction<{
            itemId: number,
            optionId: number,
            newNextId: number,
            currentItemId: number
        }>) => {
            console.log("Новый itemId " + action.payload.itemId)
            console.log("Новый optionId " + action.payload.optionId)
            console.log("Новый nextId " + action.payload.newNextId)
            console.log("Новый currentItemId " + action.payload.currentItemId)
            const tempItems = [...state.newGuide.items.map(item => {
                if (item.id === action.payload.itemId) {
                    return {
                        ...item, options: [...item.options.map(option => {
                            if (option.id === action.payload.optionId) {
                                console.log("Нашёл и поменял " + action.payload.optionId)
                                return {...option, nextId: action.payload.newNextId}
                            } else {
                                return option
                            }
                        })]
                    }
                } else {
                    return item
                }
            })]
            console.log(tempItems)
            state.newGuide.items = tempItems
            // [...tempItems.filter(item => item.id !== action.payload.currentItemId)]
        },
        cleanNewGuide: (state) => {
            state.newGuide = {
                title: "",
                category: "",
                items: [{id: 0, text: "", type: GUIDE_ITEM_TYPE.question, options: []}]
            }
        },
    },
    extraReducers: {}
})

export const {
    addItem,
    updateTitle,
    setCategory,
    updateText,
    updateItemType,
    addOption,
    changeNextIdFromNewGuideItem,
    cleanNewGuide
} = NewGuideSlice.actions
export default NewGuideSlice.reducer;