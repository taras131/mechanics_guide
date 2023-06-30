import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INewGuide, IGuideItem} from "../../models/newGuideInterface";
import {GUIDE_ITEM_TYPE} from "../../utils/const";
import {IGuide} from "../../models/guideInterface";
import {getNextId} from "../../utils/services";


interface INewGuideState {
    isLoading: boolean,
    newGuide: INewGuide,
    errorMessage: string,
    isNewGuide: boolean,
    editionGuideId: string
}

export const initialState: INewGuideState = {
    isLoading: false,
    newGuide:
        {
            title: "",
            category: "",
            authorId: "",
            items: [{id: 0, text: "", type: GUIDE_ITEM_TYPE.question, options: []}]
        },
    errorMessage: "",
    isNewGuide: true,
    editionGuideId: ""
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
        addOption: (state, action: PayloadAction<{ guideId: number, text: string }>) => {
            const newItemId = getNextId()
            let tempItems = [...state.newGuide.items.map(item => {
                if (item.id === action.payload.guideId) {
                    const newOptionId = getNextId()
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
            prevItemId: number,
            optionId: number,
            newNextId: number,
            currentItemId: number
        }>) => {
            const tempItems = [...state.newGuide.items.map(item => {
                if (item.id === action.payload.prevItemId) {
                    return {
                        ...item, options: [...item.options.map(option => {
                            if (option.id === action.payload.optionId) {
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
            state.newGuide.items = [...tempItems.filter(item => item.id !== action.payload.currentItemId)]
        },
        cleanNewGuide: (state) => {
            state.newGuide = {
                title: "",
                category: "",
                authorId: "",
                items: [{id: 0, text: "", type: GUIDE_ITEM_TYPE.question, options: []}],
            }
            state.isNewGuide = true
            state.editionGuideId = ""
        },
        updateOptionText: (state, action: PayloadAction<{
            guideItemId: number,
            optionId: number,
            newOptionText: string
        }>) => {
            const {guideItemId, optionId, newOptionText} = action.payload
            state.newGuide.items = [...state.newGuide.items.map(guide => {
                if (guide.id === guideItemId) {
                    return {
                        ...guide, options: [...guide.options.map(option => {
                            if (option.id === optionId) {
                                return {...option, text: newOptionText}
                            } else {
                                return option
                            }
                        })]
                    }
                } else {
                    return guide
                }
            })]
        },
        deleteOption: (state, action: PayloadAction<{
            guideItemId: number,
            optionId: number
        }>) => {
            const {guideItemId, optionId} = action.payload


            state.newGuide.items = [...state.newGuide.items.map(guide => {
                if (guide.id === guideItemId) {
                    return {
                        ...guide, options: [...guide.options.filter(option => option.id !== optionId)]
                    }
                } else {
                    return guide
                }
            })]
        },
        setEditionGuide: (state, action: PayloadAction<IGuide>) => {
            state.isNewGuide = false
            state.newGuide = action.payload
            state.editionGuideId = action.payload.id
        }
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
    cleanNewGuide,
    updateOptionText,
    deleteOption,
    setEditionGuide
} = NewGuideSlice.actions
export default NewGuideSlice.reducer;