import React, { useEffect, useState } from "react";
import {
  setDoc,
  getDoc,
  doc,
  collection,
  getCountFromServer,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";

function CheckOutCard({ cartItem, id }) {
  const [quantity, setQuantity] = useState(
    cartItem.quantity === 0 ? 1 : cartItem.quantity
  );

  const addQuantity = async () => {
    setQuantity(quantity + 1);
    await updateDoc(doc(db, "cartItems", id), {
      quantity: quantity + 1,
    });
  };
  const minusQuantity = async () => {
    setQuantity(quantity - 1);
    await updateDoc(doc(db, "cartItems", id), {
      quantity: quantity - 1,
    });
  };

  return (
    <div className="w-80 h-40 m-auto mt-4 mb-4 bg-[#f2f4f5] flex items-center justify-center rounded-2xl shadow-2xl">
      <div>
        <figure className="w-20">
          <img src={cartItem.image[0]} alt={`${cartItem.gender} clothing`} />
        </figure>
      </div>

      <div className=" justify-between mt-2">
        <div className="ml-3 mb-2">
          <div className="text-lg font-bold text-neutral">{cartItem.title}</div>
          <div className="mt-2 font-bold text-neutral">${cartItem.price}</div>
          <div className="flex mt-2 ml-1">
            <div className="text-lg font-bold text-neutral border border-primary flex justify-around w-24">
              <div className="border-r border-primary text-sm px-1 pr-3 w-6 flex justify-center items-center">
                <i onClick={minusQuantity} className="fa-solid fa-minus" />
              </div>
              <p>{quantity}</p>
              <div className="border-l border-primary text-sm px-1 pl-2 w-6 flex justify-center items-center">
                <i onClick={addQuantity} className="fa-solid fa-plus" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutCard;
