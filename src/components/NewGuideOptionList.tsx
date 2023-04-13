import React, {FC} from 'react';
import {useAppSelector} from "../hooks/redux";
import {getOptionsById} from "../services/selectors/newGuideSelectors";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";

interface INewGuideOptionListProps {
    id: number
}

const NewGuideOptionList: FC<INewGuideOptionListProps> = ({id}) => {
    const location: any = useLocation()
    const navigate = useNavigate()
    const options = useAppSelector(state => getOptionsById(state, id))
    const optionsList = options.map(item => {
        const handleOptionClick = () => {
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