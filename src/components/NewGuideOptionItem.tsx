import React, {FC, useState} from 'react';
import {addBreadCrumb} from "../services/reducers/breadCrumbs";
import {routes} from "../utils/routes";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useLocation, useNavigate} from "react-router-dom";
import {Divider, ListItem, ListItemButton, TextField, Tooltip} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import {deleteOption, updateOptionText} from "../services/reducers/newGuide";
import {IGuideItem} from "../models/newGuideInterface";

interface INewGuideOptionProps {
    optionId: number,
    questionText: string,
    guideItemId: number,
    optionText: string,
    nextGuideItemId: number
}

const NewGuideOptionItem: FC<INewGuideOptionProps> = ({
                                                          optionId,
                                                          questionText,
                                                          guideItemId,
                                                          optionText,
                                                          nextGuideItemId
                                                      }) => {
    const dispatch = useAppDispatch()
    const location: any = useLocation()
    const navigate = useNavigate()
    const guideItems = useAppSelector(state => state.newGuide.newGuide.items)
    const [isEditOption, setIsEditOption] = useState(false)
    const [newOptionText, setNewOptionText] = useState(optionText)
    const toggleIsEditOption = () => {
        setIsEditOption(prev => !prev)
    }
    const handleOptionClick = () => {
        dispatch(addBreadCrumb({
            text: questionText,
            answer: optionText,
            itemId: guideItemId,
            optionId: optionId
        }))
        navigate(routes.new_guide + '/' + nextGuideItemId, {
            state: {
                from: location.pathname,
            }
        })
    }
    const handleOptionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewOptionText(e.target.value)
    }
    const handleSaveClick = () => {
        toggleIsEditOption()
        dispatch(updateOptionText({guideItemId, optionId, newOptionText}))
    }

    const getRemovedItemsId = (nextGuideItemId: number, items: IGuideItem[]) => {
        let ids = [nextGuideItemId]
        items.forEach(item => {
            if (ids.includes(item.id)) {
                item.options.forEach(option => {
                    ids.push(option.nextId)
                })
            }
        })
        const uniqId = new Set(ids)
        return Array.from(uniqId);
    }

    const handleDeleteClick = () => {
        console.log(getRemovedItemsId(nextGuideItemId, guideItems))
        dispatch(deleteOption({guideItemId, optionId}))
    }
    return (
        <>
            <ListItem disablePadding>
                {isEditOption
                    ? (<>
                        <Tooltip title="Сохранить">
                            <IconButton edge="start" aria-label="edit" onClick={handleSaveClick}>
                                <SaveAsIcon/>
                            </IconButton>
                        </Tooltip>
                        <TextField
                            id="option-text"
                            defaultValue={newOptionText}
                            onChange={handleOptionTextChange}
                            size="small"
                            fullWidth
                            variant="standard"
                        />

                    </>)
                    : (<>
                            <Tooltip title="Редактировать">
                                <IconButton edge="start" aria-label="edit" onClick={toggleIsEditOption}>
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Кликните ,чтобы перейти дольше по ветке">
                                <ListItemButton onClick={handleOptionClick}>{optionText}</ListItemButton>
                            </Tooltip>
                        </>
                    )
                }
                <Tooltip title="Удалить">
                    <IconButton edge="end" aria-label="delete" onClick={handleDeleteClick}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            </ListItem>
            {!isEditOption && (<Divider/>)}
        </>
    );
};

export default NewGuideOptionItem;