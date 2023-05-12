import {IGuideItem, IGuideItemOption} from "../models/newGuideInterface";

export const getNextId = (arr: IGuideItemOption[] | IGuideItem[]) => {
    let maxId = 0
    arr.forEach(item => {
        if (item.id > maxId) maxId = item.id
    })
    return maxId + 1
}