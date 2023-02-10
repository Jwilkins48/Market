import React, { useState } from "react";
import { setDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

function Card({ clothing, id }) {
  const [quantity, setQuantity] = useState(clothing.quantity);

  const handleAddToCart = async () => {
    const docRef = doc(db, "cartItems", id);
    const docSnap = await getDoc(docRef);
    setQuantity((prevCheckOut) => prevCheckOut + 1);

    //If item is in cart add quantity - else add to collection
    if (!docSnap.exists()) {
      await setDoc(doc(db, "cartItems", id), clothing);
      alert("added to cart!");
    } else {
      await updateDoc(doc(db, "clothing", id), {
        quantity: quantity + 1,
      });

      await updateDoc(doc(db, "cartItems", id), {
        quantity: quantity + 1,
      });
      console.log(`quantity: ${quantity + 1}`);
    }
  };

  return (
    <div className="flex">
      <div className="card mb-4  w-80 h-auto relative bg-[#f2f4f5] flex items-center m-auto mt-4 shadow-2xl">
        <figure className="w-64 mb-16">
          <img src={clothing.image[0]} alt={`${clothing.gender} clothing`} />
        </figure>
        <div className="h-26 py-3 mt-2 rounded-b-xl  absolute bottom-0 w-full">
          <div className="flex justify-between mt-2">
            <div className="ml-3 mb-2">
              <p className="text-lg font-bold text-neutral">{clothing.title}</p>
              <p className="mt-2 font-bold text-neutral">${clothing.price}</p>
            </div>
            <div className="mr-3">
              <button
                onClick={handleAddToCart}
                className="p-2 rounded-xl text-neutral font-bold "
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
