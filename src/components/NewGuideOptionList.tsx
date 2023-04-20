import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getOptionsById} from "../services/selectors/newGuideSelectors";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {addBreadCrumb} from "../services/reducers/breadCrumbs";

interface INewGuideOptionListProps {
    id: number,
    questionText: string
}

const NewGuideOptionList: FC<INewGuideOptionListProps> = ({id, questionText}) => {
    const dispatch = useAppDispatch()
    const location: any = useLocation()
    const navigate = useNavigate()
    const options = useAppSelector(state => getOptionsById(state, id))
    const optionsList = options.map(item => {
        const handleOptionClick = () => {
            dispatch(addBreadCrumb({text: questionText, answer: item.text, prevItemId: id}))
            navigate(routes.new_guide + '/' + item.nextId, {
                state: {
                    from: location.pathname,
                }
            })
        }
        return (<Button key={item.text} variant="outlined" onClick={handleOptionClick}>
            {item.text}
        </Button>)
    })
    return (
        <Grid container spacing={3} sx={{marginTop: "10px", width: "100%"}}>
            {optionsList}
        </Grid>
    );
};

export default NewGuideOptionList;