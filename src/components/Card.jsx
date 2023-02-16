import React, { useState, useEffect } from "react";
import { setDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Card({ clothing, id, onDelete }) {
  const auth = getAuth();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(false);

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
        <figure
          onClick={() => navigate(`/shop/${id}`)}
          className="w-64 mb-16 cursor-pointer"
        >
          <img src={clothing.image[0]} alt={`${clothing.gender} clothing`} />
        </figure>
        <div className="h-26 py-3 mt-2 rounded-b-xl  absolute bottom-0 w-full">
          <div className="flex justify-between mt-2 items-center mb-2">
            <div className="ml-3">
              <p className="text-lg font-bold text-neutral cursor-pointer">
                {clothing.title}
              </p>
            </div>
            <p className="mt-2 mr-3 font-bold text-neutral">
              ${clothing.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
