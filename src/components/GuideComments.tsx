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
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import AccordionWithTitleAndCounter from "./AccordionWithTitleAndCounter";

interface IProps {
    guideId: string
    expanded: string | false
    handleExpandedChange: any
}

const GuideComments: FC<IProps> = ({guideId, expanded, handleExpandedChange}) => {
    const navigate = useNavigate()
    const location: any = useLocation()
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
    const handleLoginClick = () => {
        navigate(routes.login, {state: {from: location.pathname}})
    }
    const handleRegisterClick = () => {
        navigate(routes.register, {state: {from: location.pathname}})
    }
    const handleNewCommentTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateText(e.target.value, setErrorCommentText, [], 25)
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
        setErrorCommentText(STRING_WITH_SPACE)
    }

    return (
        <AccordionWithTitleAndCounter title={"Комментарии"} count={comments.length} expanded={expanded}
                                      panelId={"panel2"}
                                      handleExpandedChange={handleExpandedChange}>
            <Stack spacing={3}>
                {user.id === STRING_EMPTY && (
                    <Typography color={SECONDARY_TEXT_COLOR} fontSize={"16px"} fontWeight={500} mt={4} mb={4}>
                                <span onClick={handleLoginClick}
                                      style={{cursor: "pointer", color: "blue"}}>Войдите </span>
                        или
                        <span onClick={handleRegisterClick}
                              style={{cursor: "pointer", color: "blue"}}> зарегистрируйтесь </span>
                        , чтобы писать комментарии.
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
        </AccordionWithTitleAndCounter>
    );
};

export default GuideComments;