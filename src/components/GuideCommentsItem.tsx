import React, {FC} from 'react';
import {IComment} from "../models/iComment";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import {deepPurple} from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {CENTER, SECONDARY_TEXT_COLOR, SPACE_BETWEEN, START} from "../utils/const";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useAppDispatch} from "../hooks/redux";
import {fetchUpdateCommentLikes} from "../services/actions/commentsActionsCreators";

interface IProps extends IComment {
    userId: string
}

const GuideCommentsItem: FC<IProps> = ({
                                           id,
                                           authorId,
                                           guideId,
                                           text,
                                           dateCreation,
                                           likedUsersId,
                                           userId
                                       }) => {
    const dispatch = useAppDispatch()
    const authorIdSplit = authorId.toUpperCase().split("")
    const isILiked = likedUsersId.find(item => item === userId)
    const handleLikeClick = () => {
        let newLikedUsersId = [...likedUsersId]
        if (isILiked) {
            newLikedUsersId = [...likedUsersId.filter(item => item !== userId)]
        } else {
            newLikedUsersId = [...newLikedUsersId, userId]
        }
        dispatch(fetchUpdateCommentLikes({commentId: id, likedUsersId: newLikedUsersId}))
    }
    return (
        <Stack spacing={2}>
            <Grid container spacing={1} alignItems={CENTER} justifyContent={SPACE_BETWEEN}>
                <Grid container alignItems={CENTER} justifyContent={START} spacing={1}>
                    <Avatar sx={{bgcolor: deepPurple[500]}}>
                        {`${authorIdSplit[0]}${authorIdSplit[authorIdSplit.length - 1]}`}
                    </Avatar>
                    <Stack ml={1}>
                        <Typography fontSize={"14px"}>
                            {authorId}
                        </Typography>
                        <Typography fontSize={"12px"} color={SECONDARY_TEXT_COLOR}>
                            {dateCreation}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid container spacing={1} alignItems={CENTER}>
                    <Typography fontWeight={500} color={SECONDARY_TEXT_COLOR} fontSize={"16px"}>
                        {likedUsersId.length}
                    </Typography>
                    <IconButton color="primary"
                                aria-label="add to shopping cart"
                                onClick={handleLikeClick}
                                disabled={userId === "" || authorId === userId}>
                        {isILiked
                            ? (<FavoriteIcon/>)
                            : (<FavoriteBorderIcon/>)}
                    </IconButton>
                </Grid>
            </Grid>
            <Typography fontSize={"18px"} fontWeight={500}>
                {text}
            </Typography>
        </Stack>
    );
};

export default GuideCommentsItem;