import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { getAuth } from "firebase/auth";
import Card from "../components/Card";

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

  const deleteWishlist = async (id) => {
    if (window.confirm("Remove from wishlist?")) {
      await deleteDoc(doc(db, "wishlist", id));

      const updatedCart = wishlist.filter((item) => item.id !== id);
      setWishlist(updatedCart);
      console.log("Deleted");
    }
  };

  return (
    <div>
      <header className="text-center mt-3 font-bold text-blue-400 wishlist">
        <h1>Wishlist</h1>
      </header>
      <div className="divider lg:w-[50rem] lg:mx-auto mx-8">
        <i className="fa-regular text-yellow-400 fa-heart" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {wishlist?.map((items) => (
          <Card
            onDelete={deleteWishlist}
            clothing={items.data}
            id={items.id}
            key={items.id}
            InWishlist={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
