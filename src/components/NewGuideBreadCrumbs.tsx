import React from 'react';
import {useAppSelector} from "../hooks/redux";
import {getBreadCrumbs} from "../services/selectors/newGuideSelectors";
import {Divider, ListItem, ListItemText, styled} from "@mui/material";
import Typography from "@mui/material/Typography";

const Root = styled('div')(({theme}) => ({
    marginTop: "20px",
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
        marginTop: theme.spacing(1),
    },
}));

const NewGuideBreadCrumbs = () => {
    const breadCrumbs = useAppSelector(state => getBreadCrumbs(state))
    const breadCrumbsList = breadCrumbs.map(item => (
        <>
            <Typography>{item.text}</Typography>
            <Divider>{item.answer}</Divider>
        </>))
    return (
        <Root>
            {breadCrumbsList}
        </Root>
    );
};

export default NewGuideBreadCrumbs;