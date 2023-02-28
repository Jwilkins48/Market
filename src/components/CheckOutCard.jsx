import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useNavigate } from "react-router-dom";

function CheckOutCard({ cartItem, id, deleteCartItem, checkOut, setCheckOut }) {
  const [quantity, setQuantity] = useState(cartItem.amount);
  const navigate = useNavigate();
  return (
    <div className="mx-5 lg:w-96 h-44 m-auto relative mt-4 mb-4 bg-[#f2f4f5] flex items-center justify-evenly rounded-2xl shadow-2xl">
      <div>
        <button
          className="absolute top-2 right-5 opacity-[.45] hover:text-blue-400"
          onClick={() => deleteCartItem(id)}
        >
          <i className="fa-solid fa-xmark" />
        </button>
        <figure
          onClick={() => navigate(`/shop/${id}`)}
          className="w-20 cursor-pointer"
        >
          <img src={cartItem.image[0]} alt={`${cartItem.gender} clothing`} />
        </figure>
      </div>

      <div className=" justify-between mt-2">
        <div className="ml-3 mb-2 w-40">
          <div className="text-lg font-bold text-neutral">{cartItem.title}</div>
          <div className="text-lg font-bold text-neutral">
            {cartItem.sizing}
          </div>
          <div className="mt-2 font-bold text-neutral">${cartItem.price}</div>
          <div className="flex mt-2 ml-1">
            <p>Quantity: {quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutCard;
