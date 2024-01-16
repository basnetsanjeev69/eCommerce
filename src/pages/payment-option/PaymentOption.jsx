import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import NewPayment from "../../components/payment/NewPayment";
import PaymentTable from "../../components/payment/PaymentTable";

function PaymentOption() {
  return (
    <AdminLayout title="Payment Option">
      <NewPayment />
      <PaymentTable />
    </AdminLayout>
  );
}

export default PaymentOption;
