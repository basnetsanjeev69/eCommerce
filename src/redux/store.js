import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './auth/userSlice'
import categoryReducer from './category/categorySlice'
import productReducer from './product/productSlice'
import paymentOptionReducer from './payment/paymentOptionSlice'


const persistConfig = {
    key: "ecommerce",
    storage
}

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        userInfo: persistedUserReducer,
        category: categoryReducer,
        product: productReducer,
        paymentOption: paymentOptionReducer,
    }
})