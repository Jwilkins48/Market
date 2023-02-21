import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  setDoc,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import Footer from "../components/Footer";
import { getAuth } from "firebase/auth";

function ItemCard({ item, id, quantity, setQuantity }) {
  const params = useParams();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("SM");
  const [wishlist, setWishlist] = useState(false);

  const handleClick = async (size) => {
    setSize(size);
    setOpen(!open);
    setLoading(false);
  };

  const handleAddToCart = async () => {
    const docRef = doc(db, "cartItems", params.id);
    const docSnap = await getDoc(docRef);
    setQuantity((prevCheckOut) => prevCheckOut + 1);

    //If item is in cart add quantity - else add to collection
    if (!docSnap.exists()) {
      const copy = {
        ...item,
        sizing: size,
      };
      await setDoc(doc(db, "cartItems", id), copy);
      setLoading(false);
      alert("added to cart!");
    } else {
      await updateDoc(doc(db, "cartItems", id), {
        size: size,
      });
      await updateDoc(doc(db, "clothing", id), {
        quantity: quantity + 1,
      });

      await updateDoc(doc(db, "cartItems", id), {
        quantity: quantity + 1,
      });
      setLoading(false);
    }
  };

  const deleteWishlist = async (id) => {
    if (window.confirm("Remove from wishlist?")) {
      await deleteDoc(doc(db, "wishlist", id));
      console.log("Deleted");
    }
  };

  //Add to wishlist
  const onclick = async () => {
    if (wishlist === true) {
      setWishlist(!wishlist);
      deleteWishlist(id);
    } else {
      setWishlist(!wishlist);
      const dataCopy = {
        ...item,
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
    <div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 items-center justify-center m-auto lg:w-[50rem] lg:h-[85vh]">
        <div>
          <figure>
            <img
              className="lg:w-96 border border-green-100 rounded-lg shadow-xl"
              src={item?.image[0]}
              alt="selected item"
            />
          </figure>
        </div>
        <div className="flex flex-col lg:h-[36rem] relative">
          {/* Wishlist btn */}
          <button
            onClick={onclick}
            className="right-8 text-xl top-5 absolute text-rose-300"
          >
            {!wishlist ? (
              <i className="fa-regular fa-heart" />
            ) : (
              <i className="fa-solid fa-heart" />
            )}
          </button>

          <h3 className="text-4xl mt-40 text-neutral font-bold mb-3">
            {item?.title}
          </h3>
          <p className="text-2xl text-neutral mb-3">${item?.price}</p>
          <div>
            <select
              className="rounded shadow-lg badge-outline border lg:w-72 flex justify-between px-2 py-3  cursor-pointer text-lg"
              onClick={(e) => handleClick(e.target.value)}
            >
              <option value="Size">Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <button
            className="btn lg:w-72 mt-3  shadow-lg btn-primary"
            onClick={() => handleAddToCart(params.id)}
          >
            Add To Cart
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemCard;
