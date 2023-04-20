import {IGuide} from "../models/guideInterface";
import {INewGuide} from "../models/newGuideInterface";
import {db} from "../firebase";
import {
    addDoc,
    collection,
    query,
    onSnapshot
} from "firebase/firestore";
import {useAppDispatch} from "../hooks/redux";
import {setGuides} from "../services/reducers/guides"

class Api {
    getAllGuides = async () => {


    }
    addNewGuide = async (guide: INewGuide) => {
        const newGuide = {...guide, items: JSON.stringify(guide.items)}
        console.log(newGuide)
        let res = await addDoc(collection(db, "guides"),
            {
                title: guide.title,
                category: guide.category,
                items: JSON.stringify(guide.items)
            }
        );
        console.log(res)
    }
}

const api = new Api();

export default api;