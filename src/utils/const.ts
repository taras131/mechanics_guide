import {IGuide} from "../models/guideInterface";

export const guides: IGuide[] = [
    {
        id: 0,
        title: "Дым из выхлопной трубы",
        questions: [
            {
                id: 1,
                text: 'цвет дыма двигателя',
                options: [
                    {text: 'Белый', nextQuestionId: 2},
                    {text: 'Чёрный', nextQuestionId: 3},
                ],
            },
            {
                id: 2,
                text: 'Есть ли турбина?',
                options: [
                    {text: 'Да', nextQuestionId: 4},
                    {text: 'Нет', nextQuestionId: 5},
                ],
            },
            {
                id: 3,
                text: 'Какой на вкус тосол',
                options: [
                    {text: 'Сладкий', nextQuestionId: 6},
                    {text: 'солёный', nextQuestionId: 7},
                ],
            },
        ],
        results: [
            {id: 4, text: 'Машина с турбиной - одноразовая игрушка'},
            {id: 5, text: 'Машина без турбины это не дело'},
            {id: 6, text: 'Сладкий тосол пить вредно'},
            {id: 7, text: 'Солёный тосол пить вредно'},
        ],
    },
    {
        id: 1,
        title: "Машина плохо разгоняется",
        questions: [
            {
                id: 1,
                text: 'У вас тойота',
                options: [
                    {text: 'Да', nextQuestionId: 2},
                    {text: 'Нет', nextQuestionId: 3},
                ],
            },
            {
                id: 2,
                text: 'Вы замечали пауков рядом с ней?',
                options: [
                    {text: 'Да', nextQuestionId: 4},
                    {text: 'Нет', nextQuestionId: 5},
                ],
            },
            {
                id: 3,
                text: 'У вас Форд',
                options: [
                    {text: 'да', nextQuestionId: 6},
                    {text: 'нет', nextQuestionId: 7},
                ],
            },
        ],
        results: [
            {
                id: 4, text: 'желтосумых пауков привлекает гидрокарбон в трубках ' +
                    'топливной системы, и им  комфортно там - они начинают ' +
                    'плести паутину, что приводит к "негативному давлению" на ' +
                    'бензобак. Это могло привести к поломке бака или, того хуже, ' +
                    'возгоранию.'
            },
            {id: 5, text: 'Не тойота - не машина'},
            {id: 6, text: 'Хороший стук вылезет наружу!'},
            {id: 7, text: 'Форд не машина'},
        ],
    },
    {
        id: 2,
        title: "Дым из выхлопной трубы",
        questions: [
            {
                id: 1,
                text: 'цвет дыма двигателя',
                options: [
                    {text: 'Белый', nextQuestionId: 2},
                    {text: 'Чёрный', nextQuestionId: 3},
                ],
            },
            {
                id: 2,
                text: 'Есть ли турбина?',
                options: [
                    {text: 'Да', nextQuestionId: 4},
                    {text: 'Нет', nextQuestionId: 5},
                ],
            },
            {
                id: 3,
                text: 'Какой на вкус тосол',
                options: [
                    {text: 'Сладкий', nextQuestionId: 6},
                    {text: 'солёный', nextQuestionId: 7},
                ],
            },
        ],
        results: [
            {id: 4, text: 'Машина с турбиной - одноразовая игрушка'},
            {id: 5, text: 'Машина без турбины это не дело'},
            {id: 6, text: 'Сладкий тосол пить вредно'},
            {id: 7, text: 'Солёный тосол пить вредно'},
        ],
    },
    {
        id: 3,
        title: "Дым из выхлопной трубы",
        questions: [
            {
                id: 1,
                text: 'цвет дыма двигателя',
                options: [
                    {text: 'Белый', nextQuestionId: 2},
                    {text: 'Чёрный', nextQuestionId: 3},
                ],
            },
            {
                id: 2,
                text: 'Есть ли турбина?',
                options: [
                    {text: 'Да', nextQuestionId: 4},
                    {text: 'Нет', nextQuestionId: 5},
                ],
            },
            {
                id: 3,
                text: 'Какой на вкус тосол',
                options: [
                    {text: 'Сладкий', nextQuestionId: 6},
                    {text: 'солёный', nextQuestionId: 7},
                ],
            },
        ],
        results: [
            {id: 4, text: 'Машина с турбиной - одноразовая игрушка'},
            {id: 5, text: 'Машина без турбины это не дело'},
            {id: 6, text: 'Сладкий тосол пить вредно'},
            {id: 7, text: 'Солёный тосол пить вредно'},
        ],
    },
    {
        id: 4,
        title: "Дым из выхлопной трубы",
        questions: [
            {
                id: 1,
                text: 'цвет дыма двигателя',
                options: [
                    {text: 'Белый', nextQuestionId: 2},
                    {text: 'Чёрный', nextQuestionId: 3},
                ],
            },
            {
                id: 2,
                text: 'Есть ли турбина?',
                options: [
                    {text: 'Да', nextQuestionId: 4},
                    {text: 'Нет', nextQuestionId: 5},
                ],
            },
            {
                id: 3,
                text: 'Какой на вкус тосол',
                options: [
                    {text: 'Сладкий', nextQuestionId: 6},
                    {text: 'солёный', nextQuestionId: 7},
                ],
            },
        ],
        results: [
            {id: 4, text: 'Машина с турбиной - одноразовая игрушка'},
            {id: 5, text: 'Машина без турбины это не дело'},
            {id: 6, text: 'Сладкий тосол пить вредно'},
            {id: 7, text: 'Солёный тосол пить вредно'},
        ],
    }
]




