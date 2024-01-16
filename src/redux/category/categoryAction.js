import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { db } from "../../firebase-config/config"
import { DB_NAMES } from "../../utils"
import { setCategoryList } from "./categorySlice"

// Create and Update
export const addOrUpdateCategoryAction = ({ slug, ...rest }) => async (dispatch) => {
    try {
        const catPromise = setDoc(doc(db, DB_NAMES.CATEGORY, slug), rest, { merge: true })
        toast.promise(catPromise, {
            pending: "In Progress"
        })
        await catPromise;
        toast.success("Category added")
        dispatch(getAllCategoriesAction())
    } catch (e) {
        toast.error(`Something went wrong ${e.message}`)
    }
}


// Get all from db
export const getAllCategoriesAction = () => async dispatch => {
    try {
        const querySnapshot = await getDocs(collection(db, DB_NAMES.CATEGORY));
        const catList = [];
        querySnapshot.forEach(doc => {
            const slug = doc.id;
            const data = doc.data()
            catList.push({
                ...data,
                slug
            })
        })
        dispatch(setCategoryList(catList))
    } catch (e) {
        toast.error(`Something went wrong ${e.message}`)
    }
}

export const deleteCategoryAction = ({ slug }) => async dispatch => {
    try {
        const deletePromise = deleteDoc(doc(db, DB_NAMES.CATEGORY, slug));
        toast.promise(deletePromise, {
            pending: "In Progress"
        })
        await deletePromise;
        toast.success("Category Deleted")
        dispatch(getAllCategoriesAction())
    } catch (e) {
        toast.error(`Something went wrong ${e.message}`)
    }
}