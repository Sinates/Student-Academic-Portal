import RootLayout from "@/layouts/RootLayout";
import React from "react";
import PaymentList from "@/components/payment/PaymentList";
import TopHeader from "@/components/common/Header";
import { Card } from "@material-tailwind/react";

function Payment() {
 
  return (
    <RootLayout>
      <TopHeader />
      <Card className="h-full  overflow-auto mx-16 mt-10">
     < PaymentList/>
     </Card>
    </RootLayout>
  );
}

export default Payment;
