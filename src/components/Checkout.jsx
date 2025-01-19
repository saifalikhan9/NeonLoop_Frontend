import React from "react";
import Address from "./Address";
import OrderReviewPage from "./OrdersReview";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 p-3 sm:p-4 border-b md:border-b-0 md:border-r border-gray-800">
          <Address />
        </div>
        <div className="w-full mt-7 md:w-1/2 p-3 sm:p-4 overflow-y-auto ">
          <OrderReviewPage />
        </div>
      </div>
    </div>
  );
}