import {IGuide} from "../models/guideInterface";

export enum GUIDE_ITEM_TYPE {
    question = "question",
    result = "result"
}

export enum GUIDE_CATEGORY {
    engine = "engine",
}

export const guides = [
    {
        id: 0,
        title: "Дым из выхлопной трубы",
        category: GUIDE_ITEM_TYPE.question,
        items: [
            {
                id: 1,
                text: "Цвет дыма двигателя",
                type: GUIDE_ITEM_TYPE.question,
                options: [{id: 0, text: "Белый", nextId: 2}, {id: 1, text: "Чёрный", nextId: 3}]
            },
            {
                id: 2,
                text: "Есть ли турбина?",
                type: GUIDE_ITEM_TYPE.question,
                options: [{id: 0, text: "Да", nextId: 4}, {id: 1, text: "Нет", nextId: 5}]
            },
            {
                id: 3,
                text: "Какой на вкус тосол?",
                type: GUIDE_ITEM_TYPE.question,
                options: [{id: 0, text: "Сладкий", nextId: 6}, {id: 1, text: "Солёный", nextId: 7}]
            },
            {
                id: 4,
                text: "Машина с турбиной - одноразовая игрушка",
                type: GUIDE_ITEM_TYPE.result,
                options: []
            },
            {
                id: 5,
                text: "Машина без турбины это не дело",
                type: GUIDE_ITEM_TYPE.result,
                options: []
            },
            {
                id: 6,
                text: "Сладкий тосол пить вредно",
                type: GUIDE_ITEM_TYPE.result,
                options: []
            },
            {
                id: 7,
                text: "Солёный тосол пить вредно",
                type: GUIDE_ITEM_TYPE.result,
                options: []
            },
        ]
    }
]



