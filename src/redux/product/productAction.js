import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { db } from "../../firebase-config/config"
import { DB_NAMES } from "../../utils"
import { setProductList } from "./productSlice"

// Create and Update
export const addOrUpdateProductAction = ({ slug, ...rest }) => async (dispatch) => {
    try {
        const proPromise = setDoc(doc(db, DB_NAMES.PRODUCT, slug), rest, { merge: true })
        toast.promise(proPromise, {
            pending: "In Progress"
        })
        await proPromise;
        toast.success("Success!")
        dispatch(getAllProductsAction())
    } catch (e) {
        toast.error(`Something went wrong ${e.message}`)
    }
}


// Get all from db
export const getAllProductsAction = () => async dispatch => {
    try {
        const querySnapshot = await getDocs(collection(db, DB_NAMES.PRODUCT));
        const productList = [];
        querySnapshot.forEach(doc => {
            const slug = doc.id;
            const data = doc.data()
            productList.push({
                ...data,
                slug
            })
        })
        dispatch(setProductList(productList))
    } catch (e) {
        toast.error(`Something went wrong ${e.message}`)
    }
}

export const deleteProductAction = ({ slug }) => async dispatch => {
    try {
        const deletePromise = deleteDoc(doc(db, DB_NAMES.PRODUCT, slug));
        toast.promise(deletePromise, {
            pending: "In Progress"
        })
        await deletePromise;
        toast.success("Success!")
        dispatch(getAllProductsAction())
    } catch (e) {
        toast.error(`Something went wrong ${e.message}`)
    }
}