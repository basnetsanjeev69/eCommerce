import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentOptionList: [],
};

const paymentOptionSlice = createSlice({
  name: "paymentOption",
  initialState,
  reducers: {
    setPaymentOptionList: (state, action) => {
      state.paymentOptionList = action.payload;
    },
  },
});

const { actions, reducer } = paymentOptionSlice;
export const { setPaymentOptionList } = actions;
export default reducer;
