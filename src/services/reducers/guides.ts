import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchAllGuides, fetchNewGuide, fetchRemoveGuide} from "../actions/guidesActionsCreators";
import {IGuide, IGuideCategory, IGuideItemOption} from "../../models/iGuide";
import {GUIDE_ITEM_TYPE} from "../../utils/const";

interface IGuideState {
    isLoading: boolean,
    isEdit: boolean,
    errorMessage: string,
    categories: IGuideCategory []
    guides: IGuide[],
    editionGuide: IGuide
}

export const emptyGuide = {
    id: "EDITION_GUIDE_ID",
    title: "",
    categoryId: "",
    authorId: "",
    items: [
        {
            id: 0,
            text: "",
            type: GUIDE_ITEM_TYPE.question,
            options: []
        }
    ]
}

export const initialState: IGuideState = {
    isLoading: true,
    isEdit: false,
    errorMessage: "",
    categories: [],
    guides: [],
    editionGuide: emptyGuide
}

export const GuidesSlice = createSlice({
        name: 'guides',
        initialState,
        reducers: {
            setGuides: (state, action: PayloadAction<IGuide[] | []>) => {
                state.guides = action.payload
            },
            setIsGuidesLoading: (state, action: PayloadAction<boolean>) => {
                state.isLoading = action.payload
            },
            setGuideCategories: (state, action: PayloadAction<IGuideCategory[]>) => {
                state.categories = action.payload
            },
            setIsEdit: (state, action: PayloadAction<boolean>) => {
                state.isEdit = action.payload
            },
            setEditionGuide: (state, action: PayloadAction<IGuide>) => {
                state.editionGuide = action.payload
            },
            setEditionGuideCategory: (state, action: PayloadAction<string>) => {
                state.editionGuide.categoryId = action.payload
            },
            changeEditionGuideTitle: (state, action: PayloadAction<string>) => {
                state.editionGuide.title = action.payload
            },
            changeEditionGuideItemsText: (state, action: PayloadAction<{ guideStepId: number, newValue: string }>) => {
                state.editionGuide.items = [...state.editionGuide.items.map(item => {
                    if (item.id === action.payload.guideStepId) {
                        return {...item, text: action.payload.newValue}
                    } else {
                        return item
                    }
                })]
            },
            changeEditionGuideItemsType: (state, action: PayloadAction<{
                guideStepId: number,
                newValue: GUIDE_ITEM_TYPE
            }>) => {
                state.editionGuide.items = [...state.editionGuide.items.map(item => {
                    if (item.id === action.payload.guideStepId) {
                        return {...item, type: action.payload.newValue}
                    } else {
                        return item
                    }
                })]
            },
            changeEditionGuideOptionText: (state, action: PayloadAction<{
                guideStepId: number,
                optionId: number
                newValue: string
            }>) => {
                console.log(action.payload.newValue)
                state.editionGuide.items = [...state.editionGuide.items.map(item => {
                    if (item.id === action.payload.guideStepId) {
                        return {
                            ...item, options: [...item.options.map(option => {
                                if (option.id === action.payload.optionId) {
                                    return {...option, text: action.payload.newValue}
                                } else {
                                    return option
                                }
                            })]
                        }
                    } else {
                        return item
                    }
                })]
            },
            editionGuideStepAddOption: (state, action: PayloadAction<{
                guideStepId: number,
                newOption: IGuideItemOption
            }>) => {
                const {newOption, guideStepId} = action.payload
                state.editionGuide = {
                    ...state.editionGuide, items: [...state.editionGuide.items.map(item => {
                        if (guideStepId === item.id) {
                            console.log(guideStepId, item.id)
                            return {...item, options: [...item.options, newOption]}
                        } else {
                            return item
                        }
                    })]
                }
                console.log("completed")
                state.editionGuide.items = [...state.editionGuide.items, {
                    id: newOption.nextId,
                    text: "",
                    type: GUIDE_ITEM_TYPE.question,
                    options: []
                }]
            },
            editionGuideStepRemoveOption: (state, action: PayloadAction<{
                guideStepId: number,
                optionId: number
            }>) => {
                const {optionId, guideStepId} = action.payload
                state.editionGuide = {
                    ...state.editionGuide, items: [...state.editionGuide.items.map(item => {
                        if (guideStepId === item.id) {
                            return {...item, options: [...item.options.filter(option => option.id !== optionId)]}
                        } else {
                            return item
                        }
                    })]
                }
            }
        },
        extraReducers: {
            [fetchAllGuides.fulfilled.type]: (state, action: PayloadAction<IGuide[]>) => {
                console.log(action.payload)
                state.guides = action.payload
                state.isLoading = false;
            },
            [fetchAllGuides.pending.type]: (state) => {
                state.isLoading = true
                state.errorMessage = '';
            },
            [fetchAllGuides.rejected.type]: (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
            },
            [fetchNewGuide.fulfilled.type]: (state, action: PayloadAction<IGuide>) => {
                state.guides = [...state.guides, action.payload]
                state.isLoading = false;
            },
            [fetchNewGuide.pending.type]: (state) => {
                state.isLoading = true
                state.errorMessage = '';
            },
            [fetchNewGuide.rejected.type]: (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
            },
            [fetchRemoveGuide.fulfilled.type]: (state, action: PayloadAction<IGuide>) => {
                state.isLoading = false;
            },
            [fetchRemoveGuide.pending.type]: (state) => {
                state.isLoading = true
                state.errorMessage = '';
            },
            [fetchRemoveGuide.rejected.type]: (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
            },
        }
    }
)

export const {
    setGuides, setIsGuidesLoading, setGuideCategories, setIsEdit, setEditionGuide,
    setEditionGuideCategory, changeEditionGuideTitle, changeEditionGuideItemsText,
    changeEditionGuideItemsType, changeEditionGuideOptionText, editionGuideStepAddOption,
    editionGuideStepRemoveOption
} = GuidesSlice.actions
export default GuidesSlice.reducer;