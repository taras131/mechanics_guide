export interface IOption {
    text: string,
    nextQuestionId: number
}

export interface IQuestion {
    id: number,
    text: string,
    options: IOption[]
}

export interface IResult {
    id: number,
    text: string
}

export interface IGuide {
    id: number,
    title: string,
    questions: IQuestion[]
    results: IResult[]
}