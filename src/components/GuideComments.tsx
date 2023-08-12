import React, {FC, useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, FormControl, Paper} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {
    CENTER,
    END,
    FORM_CONTROL_HEIGHT_PX,
    SECONDARY_TEXT_COLOR, START,
    STRING_EMPTY,
    STRING_WITH_SPACE
} from "../utils/const";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../firebase";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setComments, setCommentsLoading} from "../services/reducers/comments";
import {IComment} from "../models/iComment";
import {getComments, getCommentsIsLoading} from "../services/selectors/commentsSelectors";
import GuideCommentsItem from "./GuideCommentsItem";
import {getUser} from "../services/selectors/authSelector";
import {fetchAddComment} from "../services/actions/commentsActionsCreators";
import firebase from "firebase/compat";
import {getTodayDate, validateText} from "../utils/services";
import SendIcon from '@mui/icons-material/Send';

interface IProps {
    guideId: string
}

const GuideComments: FC<IProps> = ({guideId}) => {
    const dispatch = useAppDispatch()
    const [newCommentText, setNewCommentText] = useState(STRING_EMPTY)
    const [errorCommentText, setErrorCommentText] = useState(STRING_WITH_SPACE)
    const comments = useAppSelector(state => getComments(state))
    const isLoading = useAppSelector(state => getCommentsIsLoading(state))
    const user = useAppSelector(state => getUser(state))
    const commentsList = comments.map(comment => <GuideCommentsItem key={comment.id} {...comment} userId={user.id}/>)
    useEffect(() => {
        const q = query(collection(db, "comments"), where('guideId', "==", guideId))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                dispatch(setCommentsLoading(true))
                let commentsArr: IComment [] = []
                querySnapshot.forEach((doc: any) => {
                    commentsArr.push({...doc.data(), id: doc.id, likedUsersId: JSON.parse(doc.data().likedUsersId)});
                });
                dispatch(setComments(commentsArr))
                dispatch(setCommentsLoading(false))
            } catch (e) {
                dispatch(setCommentsLoading(false))
                alert(e);
            }
            return () => unsubscribe();
        });
    }, [])
    const handleNewCommentTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateText(e.target.value, setErrorCommentText, [], 5)
        setNewCommentText(e.target.value)
    }
    const handleAddCommentClick = () => {
        dispatch(fetchAddComment({
            authorId: user.id,
            guideId: guideId,
            text: newCommentText,
            likedUsersId: [],
            dateCreation: getTodayDate()
        }))
        setNewCommentText(STRING_EMPTY)
    }
    return (
        <Paper>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{width: "100%"}}
                >
                    <Grid container alignItems="center" justifyContent="space-between"
                          sx={{width: "100%", paddingRight: "10px"}}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <ChatBubbleOutlineIcon color="primary"/>
                            <Typography fontWeight={500} fontSize={16}>
                                Комментарии
                            </Typography>
                        </Stack>
                        {comments.length > 0 && (
                            <Avatar sx={{
                                width: 24, height: 24, bgcolor: deepPurple[500], fontSize: "12px"
                            }}>
                                {comments.length}
                            </Avatar>)}
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={3}>
                        {user.id === STRING_EMPTY && (
                            <Typography color={SECONDARY_TEXT_COLOR} fontSize={"16px"} fontWeight={500}>
                                Войдите или зарегистрируйтесь, чтобы писать комментарии.
                            </Typography>
                        )}
                        {user.id !== STRING_EMPTY && (
                            <FormControl sx={{minHeight: FORM_CONTROL_HEIGHT_PX}}>
                                <Grid container alignItems={START} spacing={2}>
                                    <Grid xs={12} sm={8} md={9}>
                                        <TextField value={newCommentText}
                                                   onChange={handleNewCommentTextChange}
                                                   fullWidth
                                                   helperText={errorCommentText}/>
                                    </Grid>
                                    <Grid xs={12} sm={4} md={3}>
                                        <Button fullWidth
                                                disabled={user.id === STRING_EMPTY || !!errorCommentText}
                                                variant={"outlined"}
                                                onClick={handleAddCommentClick}
                                                sx={{height: "56px", textAlign: "center"}}>
                                            <Grid container alignItems={CENTER} justifyContent={CENTER}>
                                                <SendIcon/>
                                                <Typography ml={2}>
                                                    Отправить
                                                </Typography>
                                            </Grid>
                                        </Button>
                                    </Grid>

                                </Grid>
                            </FormControl>
                        )}
                        {isLoading && (
                            <Typography>
                                ...Загрузка
                            </Typography>
                        )}
                        {commentsList.length > 0
                            ? commentsList
                            : (
                                <Typography mt={5}>
                                    Комментариев пока нет
                                </Typography>
                            )}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
};

export default GuideComments;