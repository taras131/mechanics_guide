import React, {FC} from 'react';
import {useAppSelector} from "../hooks/redux";
import {getGuideCategories} from "../services/selectors/guidesSelectors";
import {List, ListItem, ListItemText} from "@mui/material";
import ListSubheader from '@mui/material/ListSubheader';
import {IGuideCategory} from "../models/iGuide";


interface ICategoryListProps {
    categories: IGuideCategory []
}

const CategoryList: FC<ICategoryListProps> = ({categories}) => {
    const categoriesList = categories.map((category, index) => {
        return (
            <ListItem key={category.id}>
                <ListItemText primary={`${index + 1}. ${category.categoryName}`}/>
            </ListItem>
        )
    })
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 390,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': {padding: 0},
            }}
            subheader={<li/>}
        >
            <ListSubheader> Существующие категории</ListSubheader>
            {categoriesList}
        </List>
    );
};

export default CategoryList;