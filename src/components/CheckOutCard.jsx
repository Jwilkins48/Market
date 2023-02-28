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
        <figure className="w-20 cursor-pointer">
          <img src={cartItem.image[0]} alt={`${cartItem.gender} clothing`} />
        </figure>
      </div>

      <div className=" justify-between mt-2">
        <div className="ml-3 mb-2 w-[10.5rem]">
          <div className="text-[16px] underline font-bold text-neutral mb-1">
            {cartItem.title}
          </div>
          <p className="font-bold text-neutral text-[15px]">
            Quantity: <span className="text-blue-400">{quantity}</span>
          </p>
          <div className=" text-[16px] font-bold text-neutral">
            Size: <span className="text-blue-400">{cartItem.sizing}</span>
          </div>
          <div className=" font-bold text-neutral">${cartItem.price}</div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutCard;
