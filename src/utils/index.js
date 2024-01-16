import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase-config/config";
import { toast } from "react-toastify";

export const DB_NAMES = {
    CATEGORY: "category",
    PRODUCT: 'product',
    USERS: 'users',
    PAYMENTOPTION:'paymentOption'
}


export const handleFileUpload = (fileToUpload, setProgress) => {
    return new Promise((res, rej) => {
        const storageRef = ref(storage, `images/${fileToUpload.name}_${Date.now()}`);

        const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgress(progress)
            },
            (e) => {
                rej(e)
                toast.error(`Error on upload : ${e.message}`)
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    res(downloadURL)
                });
            }
        );
    })

}