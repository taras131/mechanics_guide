import React, {FC} from 'react';
import {useAppDispatch} from "../hooks/redux";
import {Link} from "react-router-dom";
import {addBreadCrumb} from "../services/reducers/breadCrumbs";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import {IGuideItemOption} from "../models/newGuideInterface";

interface IGuideOptionListProps {
    guideId: string
    itemId: number,
    questionText: string,
    options: IGuideItemOption []
}

const GuideOptionList: FC<IGuideOptionListProps> = ({
                                                        guideId,
                                                        itemId,
                                                        questionText,
                                                        options
                                                    }) => {
    const dispatch = useAppDispatch()
    const optionsList = options.map(item => {
        const handleOptionClick = () => {
            dispatch(addBreadCrumb({
                text: questionText,
                answer: item.text,
                prevItemId: itemId
            }))
        }
        return (
            <Grid item key={item.text}>
                <Link to={`/guide/${guideId}/${item.nextId}`}>
                    <Button
                        variant="outlined"
                        onClick={handleOptionClick}>
                        {item.text}
                    </Button>
                </Link>
            </Grid>)
    })
    return (
        <Grid container
              spacing={1}
             >
            {optionsList}
        </Grid>)
};

export default GuideOptionList;