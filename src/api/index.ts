import {db, storage} from "../firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import {IAuthData} from "../models/iAuth";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {ref, deleteObject, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {IGuide} from "../models/iGuide";
import {IFetchUploadFile, IFile} from "../services/actions/guidesActionsCreators";
import {IComment, INewComment} from "../models/iComment";
import {IUpdateLikes} from "../services/actions/commentsActionsCreators";

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
            authorId: guide.authorId,
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
    uploadFile = async (fileData: IFetchUploadFile) => {
        const name = new Date().getTime() + fileData.file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, fileData.file);
        uploadTask.on("state_changed",
            (snapshot) => {
                switch (snapshot.state) {
                    case "paused":
                        break;
                    case "running":
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                alert("Ошибка загрузки");
                switch (error.code) {
                    case "storage/unauthorized":
                        break;
                    case "storage/canceled":
                        break;
                    case "storage/unknown":
                        break;
                    default:
                        break;
                }
            },
            async () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    fileData.updateFilePath(name, downloadURL)
                });
            }
        );
    };
    removeFile = async (fileName: string) => {
        const desertRef = ref(storage, fileName);
        deleteObject(desertRef).then(() => {
            // File deleted successfully
        }).catch((e) => {
            alert(e);
        });
    };
    login = async (authData: IAuthData) => {
        const res = await signInWithEmailAndPassword(this.auth, authData.email, authData.password)
        return {email: res.user.email, id: res.user.uid}
    }
    register = async (authData: IAuthData) => {
        const res = await createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
        return {email: res.user.email, id: res.user.uid}
    }
    out = async () => {
        const res = await signOut(this.auth)
        return res
    }
    addComment = async (comment: INewComment) => {
        let res = await addDoc(collection(db, "comments"),
            {...comment, likedUsersId: JSON.stringify(comment.likedUsersId)}
        );
        return res
    }
    updateCommentLike = async (updateLikes: IUpdateLikes) => {
        let res = await updateDoc(doc(db, "comments", updateLikes.commentId), {
            likedUsersId: JSON.stringify(updateLikes.likedUsersId)
        });
        return res
    }
}

const api = new Api();

export default api;