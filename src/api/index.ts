import {INewGuide} from "../models/newGuideInterface";
import {db} from "../firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    updateDoc,
    doc,
    query,
    onSnapshot
} from "firebase/firestore";
import {IGuide} from "../models/guideInterface";

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
    removeGuide = async (guideId: string) => {
        await deleteDoc(doc(db, "guides", guideId));
    }
    updateGuide = async (guide: IGuide) => {
        await updateDoc(doc(db, "guides", guide.id), {
            title: guide.title,
            category: guide.category,
            items: JSON.stringify(guide.items)
        });
    }
}

const api = new Api();

export default api;