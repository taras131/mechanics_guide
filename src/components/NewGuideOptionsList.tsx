import React, {FC} from 'react';
import {useAppSelector} from "../hooks/redux";
import {getOptionsById} from "../services/selectors/newGuideSelectors";
import {List, ListItem, ListSubheader} from "@mui/material";
import NewGuideOptionItem from "./NewGuideOptionItem";

interface INewGuideOptionListProps {
    guideItemId: number,
    questionText: string
}

const NewGuideOptionsList: FC<INewGuideOptionListProps> = ({guideItemId, questionText}) => {
    const options = useAppSelector(state => getOptionsById(state, guideItemId))
    const optionsList = options.map(item => (<NewGuideOptionItem key={item.id} optionId={item.id}
                                                                 questionText={questionText}
                                                                 guideItemId={guideItemId}
                                                                 optionText={item.text}
                                                                 nextGuideItemId={item.nextId}/>))
    return (
        <List subheader={<ListSubheader>Варианты:</ListSubheader>}>
            {optionsList}
            {optionsList.length === 0 && (<ListItem disablePadding>
                Пока нет вариантов
            </ListItem>)}

        </List>
    );
};

export default NewGuideOptionsList;
