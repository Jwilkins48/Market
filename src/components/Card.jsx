import React, { useState, useEffect } from "react";
import {
  setDoc,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Card({ clothing, id, onDelete }) {
  const auth = getAuth();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(clothing.quantity);
  const [wishlist, setWishlist] = useState(false);

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

  //Add to wishlist
  const onclick = async () => {
    if (wishlist === true) {
      onDelete(id);
    } else {
      setWishlist(!wishlist);
      const dataCopy = {
        ...clothing,
        timestamp: serverTimestamp(),
        userRef: auth.currentUser.uid,
      };
      await setDoc(doc(db, "wishlist", id), dataCopy);
      console.log("added to wishlist");
    }
  };

  //Check if item is in wishlist
  useEffect(() => {
    const itemInWishlist = async () => {
      const docRef = doc(db, "wishlist", id);
      const docSnap = await getDoc(docRef);
      const userRef = docSnap.data()?.userRef;
      if (auth.currentUser.uid === userRef) {
        setWishlist(true);
      } else {
        setWishlist(false);
      }
    };
    itemInWishlist();
  }, []);

  return (
    <div className="flex">
      <div className="card mb-4  w-80 h-auto relative bg-[#f2f4f5] flex items-center m-auto mt-4 shadow-2xl">
        <button
          onClick={onclick}
          className="right-8 text-xl top-5 absolute text-blue-300"
        >
          {!wishlist ? (
            <i className="fa-regular fa-heart" />
          ) : (
            <i className="fa-solid fa-heart" />
          )}
        </button>
        <figure className="w-64 mb-16">
          <img src={clothing.image[0]} alt={`${clothing.gender} clothing`} />
        </figure>
        <div className="h-26 py-3 mt-2 rounded-b-xl  absolute bottom-0 w-full">
          <div className="flex justify-between mt-2">
            <div className="ml-3 mb-2">
              <p
                onClick={() => navigate(`/shop/${id}`)}
                className="text-lg font-bold text-neutral cursor-pointer"
              >
                {clothing.title}
              </p>
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
