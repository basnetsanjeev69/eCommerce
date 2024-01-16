import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase-config/config";
import { DB_NAMES } from "../../utils";
import { setPaymentOptionList } from "./paymentOptionSlice";

// Create and Update
export const addOrUpdatePaymentAction =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      const paymentPromise = setDoc(doc(db, DB_NAMES.PAYMENTOPTION, slug), rest, {
        merge: true,
      });
      toast.promise(paymentPromise, {
        pending: "In Progress",
      });
      await paymentPromise;
      toast.success("Success!");
      dispatch(getAllPaymentOptionAction());
    } catch (e) {
      toast.error(`Something went wrong ${e.message}`);
    }
  };

// Get all from db
export const getAllPaymentOptionAction = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, DB_NAMES.PAYMENTOPTION));
    const paymentOptionList = [];
    querySnapshot.forEach((doc) => {
      const slug = doc.id;
      const data = doc.data();
      paymentOptionList.push({
        ...data,
        slug,
      });
    });
    dispatch(setPaymentOptionList(paymentOptionList));
  } catch (e) {
    toast.error(`Something went wrong ${e.message}`);
  }
};

// export const deleteProductAction =
//   ({ slug }) =>
//   async (dispatch) => {
//     try {
//       const deletePromise = deleteDoc(doc(db, DB_NAMES.PRODUCT, slug));
//       toast.promise(deletePromise, {
//         pending: "In Progress",
//       });
//       await deletePromise;
//       toast.success("Success!");
//       dispatch(getAllProductsAction());
//     } catch (e) {
//       toast.error(`Something went wrong ${e.message}`);
//     }
//   };
