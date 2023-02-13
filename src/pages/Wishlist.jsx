import React, { useEffect, useState } from "react";
import {
  setDoc,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { getAuth } from "firebase/auth";
import WishlistCard from "../components/WishlistCard";

function Wishlist() {
  const [wishlist, setWishlist] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    const fetchCheckOut = async () => {
      try {
        const checkOutRef = collection(db, "wishlist");
        const q = query(
          checkOutRef,
          where("userRef", "==", auth.currentUser.uid)
        );
        const checkOutSnap = await getDocs(q);
        //Giving each item id/data
        const wishlist = [];
        checkOutSnap.forEach((doc) => {
          return wishlist.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setWishlist(wishlist);
        console.log(wishlist);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCheckOut();
  }, []);

  return (
    <div>
      {wishlist?.map((items) => (
        <WishlistCard wishlistItem={items.data} id={items.id} key={items.id} />
      ))}
    </div>
  );
}

export default Wishlist;
