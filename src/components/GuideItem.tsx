import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {Link, useParams} from "react-router-dom";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import {removeLastBreadCrumb} from "../services/reducers/breadCrumbs";
import {GUIDE_ITEM_TYPE} from "../utils/const";
import {Card, CardContent, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {getGuideItemById} from "../services/selectors/guidesSelectors";
import GuideOptionList from "./GuideOptionList";

interface IGuideItemProps {
    guideId: string
}

const GuideItem: FC<IGuideItemProps> = ({guideId}) => {
    const dispatch = useAppDispatch()
    const itemId = useParams().itemId || 0;
    const bredCrumbs = useAppSelector(state => getBreadCrumbs(state))
    const currentItem = useAppSelector(state => getGuideItemById(state, guideId, +itemId))
    let prevItemId = 0
    if (bredCrumbs.length) prevItemId = bredCrumbs[bredCrumbs.length - 1].itemId
    const handleBackClick = () => {
        dispatch(removeLastBreadCrumb())
    }
    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        sx={{
                            width: '100%',
                            marginTop: "40px"
                        }}
                    >
                        <Grid item>
                            <Typography variant="h5" component="h2">
                                Этап № {bredCrumbs.length + 1}
                            </Typography>
                        </Grid>
                        <Grid item>
                            {bredCrumbs && bredCrumbs.length > 0 && (
                                <Link to={`/guide/${guideId}/${prevItemId}`}>
                                    <Button variant="outlined"
                                            onClick={handleBackClick}>
                                        Назад
                                    </Button>
                                </Link>
                            )}
                        </Grid>
                    </Grid>
                    <Typography variant="h6" component="h3">
                        {currentItem.type === GUIDE_ITEM_TYPE.result
                            ? "Результат:"
                            : "Вопрос:"}
                    </Typography>
                    <Typography>{currentItem.text}</Typography>
                    {currentItem.type === "question" && (
                        <>
                            <GuideOptionList
                                guideId={guideId}
                                itemId={currentItem.id}
                                questionText={currentItem.text}
                                options={currentItem.options}/>
                        </>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default GuideItem;