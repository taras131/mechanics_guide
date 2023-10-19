import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchAllGuides, fetchNewGuide, fetchRemoveGuide, fetchUploadFile} from "../actions/guidesActionsCreators";
import {IGuide, IGuideCategory, IGuideItemOption} from "../../models/iGuide";
import {GUIDE_ITEM_TYPE, GUIDE_MODE} from "../../utils/const";
import {IBreadCrumb} from "../../models/iBreadCrumbs";

interface IGuideState {
    isLoading: boolean,
    isUploadFileLoading: boolean,
    errorMessage: string,
    categories: IGuideCategory []
    guides: IGuide[],
    editionGuide: IGuide
    guideMode: GUIDE_MODE
}

export const emptyGuide = {
    id: GUIDE_MODE.new_guide,
    title: "",
    categoryId: "",
    authorId: "",
    items: [
        {
            id: 0,
            text: "",
            type: GUIDE_ITEM_TYPE.question,
            options: [],
        },
    ],
};

export const initialState: IGuideState = {
    isLoading: true,
    isUploadFileLoading: false,
    errorMessage: "",
    categories: [],
    guides: [],
    editionGuide: emptyGuide,
    guideMode: GUIDE_MODE.viewing,
};

export const GuidesSlice = createSlice({
        name: "guides",
        initialState,
        reducers: {
            setGuides: (state, action: PayloadAction<IGuide[] | []>) => {
                state.guides = action.payload;
            },
            setIsGuidesLoading: (state, action: PayloadAction<boolean>) => {
                state.isLoading = action.payload;
            },
            setGuideCategories: (state, action: PayloadAction<IGuideCategory[]>) => {
                state.categories = action.payload;
            },
            setEditionGuide: (state, action: PayloadAction<IGuide>) => {
                state.editionGuide = action.payload;
            },
            setEditionGuideCategory: (state, action: PayloadAction<string>) => {
                state.editionGuide.categoryId = action.payload;
            },
            changeEditionGuideTitle: (state, action: PayloadAction<string>) => {
                state.editionGuide.title = action.payload;
            },
            changeEditionGuideItemsText: (state, action: PayloadAction<{ guideStepId: number, newValue: string }>) => {
                state.editionGuide.items = [...state.editionGuide.items.map(item => {
                    if (item.id === action.payload.guideStepId) {
                        return {...item, text: action.payload.newValue};
                    } else {
                        return item;
                    }
                })];
            },
            changeEditionGuideItemsType: (state, action: PayloadAction<{
                guideStepId: number,
                newValue: GUIDE_ITEM_TYPE
            }>) => {
                state.editionGuide.items = [...state.editionGuide.items.map(item => {
                    if (item.id === action.payload.guideStepId) {
                        return {...item, type: action.payload.newValue};
                    } else {
                        return item;
                    }
                })];
            },
            changeEditionGuideOptionText: (state, action: PayloadAction<{
                guideStepId: number,
                optionId: number
                newValue: string
            }>) => {
                state.editionGuide.items = [...state.editionGuide.items.map(item => {
                    if (item.id === action.payload.guideStepId) {
                        return {
                            ...item, options: [...item.options.map(option => {
                                if (option.id === action.payload.optionId) {
                                    return {...option, text: action.payload.newValue};
                                } else {
                                    return option;
                                }
                            })],
                        };
                    } else {
                        return item;
                    }
                })];
            },
            editionGuideStepAddOption: (state, action: PayloadAction<{
                guideStepId: number,
                newOption: IGuideItemOption
            }>) => {
                const {newOption, guideStepId} = action.payload;
                state.editionGuide = {
                    ...state.editionGuide, items: [...state.editionGuide.items.map(item => {
                        if (guideStepId === item.id) {
                            return {...item, options: [...item.options, newOption]};
                        } else {
                            return item;
                        }
                    })],
                };
                state.editionGuide.items = [...state.editionGuide.items, {
                    id: newOption.nextId,
                    text: "",
                    type: GUIDE_ITEM_TYPE.question,
                    options: [],
                }];
            },
            editionGuideStepRemoveOption: (state, action: PayloadAction<{
                guideStepId: number,
                optionId: number
            }>) => {
                const {optionId, guideStepId} = action.payload;
                state.editionGuide = {
                    ...state.editionGuide, items: [...state.editionGuide.items.map(item => {
                        if (guideStepId === item.id) {
                            return {...item, options: [...item.options.filter(option => option.id !== optionId)]};
                        } else {
                            return item;
                        }
                    })],
                };
            },
            editionGuideResultRedirect: (state, action: PayloadAction<{
                lastBreadCrumb: IBreadCrumb,
                newNextId: number
            }>) => {
                const {lastBreadCrumb, newNextId} = action.payload;
                state.editionGuide = {
                    ...state.editionGuide, items: [...state.editionGuide.items.map(item => {
                        if (item.id === lastBreadCrumb.questionId) {
                            return {
                                ...item, options: [...item.options.map(option => {
                                    if (option.id === lastBreadCrumb.optionId) {
                                        return {...option, nextId: newNextId};
                                    } else {
                                        return option;
                                    }
                                })],
                            };
                        } else {
                            return item;
                        }
                    })],
                };
            },
            removeGuideStep: (state, action: PayloadAction<number>) => {
                state.editionGuide = {
                    ...state.editionGuide,
                    items: [...state.editionGuide.items.filter(item => item.id !== action.payload),
                    ],
                };
            },
            editionGuideRedirectAnotherGuide: (state, action: PayloadAction<{
                lastBreadCrumb: IBreadCrumb,
                redirectAnotherGuide: string
            }>) => {
                const {lastBreadCrumb, redirectAnotherGuide} = action.payload;
                state.editionGuide = {
                    ...state.editionGuide, items: [...state.editionGuide.items.map(item => {
                        if (item.id === lastBreadCrumb.questionId) {
                            return {
                                ...item, options: [...item.options.map(option => {
                                    if (option.id === lastBreadCrumb.optionId) {
                                        return {...option, redirectAnotherGuide: redirectAnotherGuide};
                                    } else {
                                        return option;
                                    }
                                })],
                            };
                        } else {
                            return item;
                        }
                    })],
                };
            },
            setIsUploadFileLoading: (state, action: PayloadAction<boolean>) => {
                state.isUploadFileLoading = action.payload;
            },
            editionGuideUpdateFile: (state, action: PayloadAction<{ guideStepId: number, filePath: string, fileName: string }>) => {
                state.editionGuide = {
                    ...state.editionGuide, items: [...state.editionGuide.items.map(item => {
                        if (item.id === action.payload.guideStepId) {
                            return {...item, file: {name: action.payload.fileName, path: action.payload.filePath}};
                        } else {
                            return item;
                        }
                    })],
                };
                state.isUploadFileLoading = false;
            },
            setGuideMode: (state, action: PayloadAction<GUIDE_MODE>) => {
                state.guideMode = action.payload;
            },
        },
        extraReducers: {
            [fetchAllGuides.fulfilled.type]: (state, action: PayloadAction<IGuide[]>) => {
                state.guides = action.payload;
                state.isLoading = false;
            },
            [fetchAllGuides.pending.type]: (state) => {
                state.isLoading = true;
                state.errorMessage = "";
            },
            [fetchAllGuides.rejected.type]: (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
            },
            [fetchNewGuide.fulfilled.type]: (state, action: PayloadAction<IGuide>) => {
                state.guides = [...state.guides, action.payload];
                state.isLoading = false;
            },
            [fetchNewGuide.pending.type]: (state) => {
                state.isLoading = true;
                state.errorMessage = "";
            },
            [fetchNewGuide.rejected.type]: (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
            },
            [fetchRemoveGuide.fulfilled.type]: (state) => {
                state.isLoading = false;
            },
            [fetchRemoveGuide.pending.type]: (state) => {
                state.isLoading = true;
                state.errorMessage = "";
            },
            [fetchRemoveGuide.rejected.type]: (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
            },
            [fetchUploadFile.fulfilled.type]: (state) => {
                state.errorMessage = "";
            },
            [fetchUploadFile.pending.type]: (state) => {

                state.errorMessage = "";
            },
            [fetchUploadFile.rejected.type]: (state, action: PayloadAction<string>) => {

                state.errorMessage = action.payload;
            },
        },
    }
);

export const {
    setGuides, setIsGuidesLoading, setGuideCategories, setEditionGuide,
    setEditionGuideCategory, changeEditionGuideTitle, changeEditionGuideItemsText,
    changeEditionGuideItemsType, changeEditionGuideOptionText, editionGuideStepAddOption,
    editionGuideStepRemoveOption, editionGuideResultRedirect, removeGuideStep,
    editionGuideRedirectAnotherGuide, setIsUploadFileLoading, editionGuideUpdateFile, setGuideMode,
} = GuidesSlice.actions;
export default GuidesSlice.reducer;