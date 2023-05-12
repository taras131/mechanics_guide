import React, {FC} from 'react';
import {useAppSelector} from "../hooks/redux";
import {useParams} from "react-router-dom";
import {GUIDE_ITEM_TYPE} from "../utils/const";
import {Card, CardContent, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {getGuideItemById} from "../services/selectors/guidesSelectors";
import GuideOptionList from "./GuideOptionList";
import GuideItemHeader from "./GuideItemHeader";

interface IGuideItemProps {
    guideId: string
}

const GuideItem: FC<IGuideItemProps> = ({guideId}) => {
    const guideItemId = useParams().itemId || 0;
    const currentItem = useAppSelector(state => getGuideItemById(state, guideId, +guideItemId))
    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <GuideItemHeader guideId ={guideId}/>
                    <Typography variant="h6" component="h3">
                        {currentItem.type === GUIDE_ITEM_TYPE.result
                            ? "Результат:"
                            : "Вопрос:"}
                    </Typography>
                    <Typography>{currentItem.text}</Typography>
                    {currentItem.type === "question" && (
                        <GuideOptionList
                            guideId={guideId}
                            itemId={currentItem.id}
                            questionText={currentItem.text}
                            options={currentItem.options}/>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default GuideItem;