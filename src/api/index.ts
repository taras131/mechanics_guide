import {INewGuide} from "../models/newGuideInterface";
import {db} from "../firebase";
import {
    addDoc,
    collection,
    query,
    onSnapshot
} from "firebase/firestore";

class Api {
    getAllGuides = async () => {


    }
    addNewGuide = async (guide: INewGuide) => {
        let res = await addDoc(collection(db, "guides"),
            {
                title: guide.title,
                category: guide.category,
                items: JSON.stringify(guide.items)
            }
        );
    }
}

const api = new Api();

export default api;