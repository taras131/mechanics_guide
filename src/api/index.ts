import {guides} from "../utils/const";
import {IGuide} from "../models/guideInterface";
import {INewGuide} from "../models/newGuideInterface";
import {db} from "../firebase";
import {
    deleteDoc,
    doc,
    updateDoc,
    addDoc,
    collection,
    query,
    onSnapshot
} from "firebase/firestore";

class Api {
    getAllIngredients = async (): Promise<Array<IGuide>> => {
        const q = query(collection(db, "guides"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            try{
                querySnapshot.forEach((doc: any) => {
                   console.log(doc)
                });

            } catch (e) {
                alert(e);
            }
        });
        setTimeout(() => {

        }, 2000)
        const res = guides
        return res
    }
    addNewGuide = async (guide: INewGuide) => {
        const newGuide = {...guide, items: JSON.stringify(guide.items)}
        console.log(newGuide)
        await addDoc(collection(db, "guides"),
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