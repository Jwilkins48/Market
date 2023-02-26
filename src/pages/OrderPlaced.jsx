import React from "react";

function OrderPlaced() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="lg:w-[45rem] lg:h-[26rem] lg:flex lg:justify-start lg:pt-20 lg:pl-10 lg:flex-col bg-gray-100 rounded-lg shadow-xl items-start">
        <h1 className="font-bold text-5xl text-neutral">Thank you!</h1>
        <p className="font-bold text-2xl text-gray-500 mt-5">
          Your order has been placed!
        </p>
      </div>
    </div>
  );
}

export default OrderPlaced;
