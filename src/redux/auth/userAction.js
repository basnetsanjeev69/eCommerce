import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify"
import { auth, db } from "../../firebase-config/config"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { setUser } from "./userSlice"
import { DB_NAMES } from "../../utils"

export const createAdminAction = (userInfo, navigate) => async () => {
    try {
        // Firebase for what
        console.log("Integrating with firebase", userInfo)
        // Auth
        const { user } = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
        const userId = user.uid;
        // DB
        const { password, confirmPassword, ...rest } = userInfo;
        const setDocPromise = setDoc(doc(db, DB_NAMES.USERS, userId), rest)
        toast.promise(setDocPromise, {
            pending: "In Progress"
        })
        await setDocPromise;
        toast.success("User Signup successful!")
        navigate("/login")
    } catch (e) {
        toast.error(e.message)
    }
}


export const resetPasswordAction = (email) => async () => {
    try {
        const resPromise = sendPasswordResetEmail(auth, email);
        toast.promise(resPromise, {
            pending: "In Progress"
        })
        await resPromise;
        toast.success("If the email exists in our system, you should have received the email")
    } catch (e) {
        toast.error(e.message)
    }
}

export const loginAdminAction = (email, password) => async dispatch => {
    try {
        const authPromise = signInWithEmailAndPassword(auth, email, password);
        toast.promise(authPromise, {
            pending: "In Progress"
        })
        const { user: { uid } } = await authPromise;
        // Auth is success,do DB call
        dispatch(getUserInfoAction(uid))
        toast.success("Login Success")
    } catch (e) {
        toast.error(e.message)
    }
}

// Grab the userInfo from DB and set the object to slice
export const getUserInfoAction = (uid) => async dispatch => {
    try {
        const userSnap = await getDoc(doc(db, DB_NAMES.USERS, uid))
        if (userSnap.exists()) {
            const userData = userSnap.data();
            const userInfo = { ...userData, uid }
            // What to do with this userInfo
            // Save this userInfo to slice/redux store
            dispatch(setUser(userInfo))
        }

    } catch (e) {
        toast.error(e.message)
    }
}