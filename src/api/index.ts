import {guides} from "../utils/const";
import {IGuide} from "../models/guideInterface";

class Api {
    getAllIngredients = async (): Promise<Array<IGuide>> => {
        const res = guides
        return res
    }
}

const api = new Api();

export default api;