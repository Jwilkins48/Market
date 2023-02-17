import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

function ItemCard({ item, id, quantity, setQuantity }) {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("SM");

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
  console.log(size);
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 items-center justify-center m-auto lg:w-[50rem] lg:h-[85vh]">
      <div>
        <figure>
          <img className="lg:w-96" src={item?.image[0]} alt="selected item" />
        </figure>
      </div>
      <div className="flex flex-col lg:h-[36rem] relative">
        <h3 className="text-4xl mt-36">{item?.title}</h3>
        <p className="text-2xl">${item?.price}</p>
        <div>
          <div
            onClick={() => setOpen(!open)}
            className="btn rounded-none btn-outline lg:w-72 flex justify-between px-2 absolute top-60"
          >
            <p>{size}</p>
            <i className="fa-solid fa-angle-down" />
          </div>

          <div className={open ? " absolute bottom-32 " : "hidden"}>
            <div
              className="border cursor-pointer hover:bg-yellow-100 flex items-center pl-2 border-neutral w-72 border-t-0 h-10 "
              onClick={() => handleClick("Small")}
            >
              Small
            </div>
            <div
              className="border flex cursor-pointer hover:bg-yellow-100 items-center pl-2 border-neutral w-72 border-t-0 h-10"
              onClick={() => handleClick("Medium")}
            >
              Medium
            </div>
            <div
              className="border flex cursor-pointer hover:bg-yellow-100 items-center pl-2 border-neutral w-72 border-t-0 h-10"
              onClick={() => handleClick("Large")}
            >
              Large
            </div>
            <div
              className="border flex cursor-pointer hover:bg-yellow-100 items-center pl-2 border-neutral w-72 border-t-0 h-10"
              onClick={() => handleClick("XL")}
            >
              XL
            </div>
          </div>
        </div>
        <button
          className={open ? "hidden" : "btn lg:w-72 mt-5 absolute top-72"}
          onClick={() => handleAddToCart(params.id)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
