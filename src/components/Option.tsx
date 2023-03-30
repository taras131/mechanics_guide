import React, {FC} from 'react';
import {IOption} from "../models/guideInterface";

const Answer: FC<IOption> = ({text, nextQuestionId}) => {
    return (
        <div>
            {text}
        </div>
    );
};

export default Answer;