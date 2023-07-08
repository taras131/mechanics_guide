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
import {IAuthData} from "../models/iAuth";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {IGuide} from "../models/iGuide";

class Api {
    auth = getAuth();
    getAllGuides = async () => {


    }
    addNewGuide = async (guide: IGuide) => {
        let res = await addDoc(collection(db, "guides"),
            {
                title: guide.title,
                categoryId: guide.categoryId,
                authorId: guide.authorId,
                items: JSON.stringify(guide.items)
            }
        );
        return res
    }
    removeGuide = async (guideId: string) => {
        await deleteDoc(doc(db, "guides", guideId));
    }
    updateGuide = async (guide: IGuide) => {
        let res = await updateDoc(doc(db, "guides", guide.id), {
            title: guide.title,
            categoryId: guide.categoryId,
            items: JSON.stringify(guide.items)
        });
        return res
    }
    addNewCategory = async (categoryName: string) => {
        await addDoc(collection(db, "guide_categories"), {
            categoryName: categoryName
        });
    }
    login = async (authData: IAuthData) => {
        const res = await signInWithEmailAndPassword(this.auth, authData.email, authData.password)
        console.log(res)
        return {email: res.user.email, id: res.user.uid}
    }
    register = async (authData: IAuthData) => {
        const res = await createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
        console.log(res)
        return {email: res.user.email, id: res.user.uid}
    }
    out = async () => {
        const res = await signOut(this.auth)
        return res
    }
}

const api = new Api();

export default api;