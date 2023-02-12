import { useState, useEffect } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

function CheckOutCard({ cartItem, id, deleteCartItem }) {
  //displayed quantity
  const [quantity, setQuantity] = useState(
    cartItem.quantity === 0 ? 1 : cartItem.quantity
  );
  //Add quantity and update in firebase
  const addQuantity = async () => {
    setQuantity(quantity + 1);
    await updateDoc(doc(db, "cartItems", id), {
      quantity: quantity + 1,
    });
  };
  //Minus quantity and update in firebase
  const minusQuantity = async () => {
    setQuantity(quantity - 1);
    await updateDoc(doc(db, "cartItems", id), {
      quantity: quantity - 1,
    });
  };

  useEffect(() => {
    quantity === 0 ? deleteCartItem(id) : "";
  }, [quantity]);

  return (
    <div className="mx-5 lg:w-96 h-40 m-auto relative mt-4 mb-4 bg-[#f2f4f5] flex items-center justify-center rounded-2xl shadow-2xl">
      <div>
        <button
          className="absolute top-2 right-5 opacity-[.45] hover:text-blue-400"
          onClick={() => deleteCartItem(id)}
        >
          <i className="fa-solid fa-xmark" />
        </button>
        <figure className="w-20">
          <img src={cartItem.image[0]} alt={`${cartItem.gender} clothing`} />
        </figure>
      </div>

      <div className=" justify-between mt-2">
        <div className="ml-3 mb-2">
          <div className="text-lg font-bold text-neutral">{cartItem.title}</div>

          <div className="mt-2 font-bold text-neutral">${cartItem.price}</div>
          <div className="flex mt-2 ml-1">
            {/* Adjust Quantity */}
            <div className="text-lg font-bold text-neutral border border-primary flex justify-around w-24">
              <div
                onClick={minusQuantity}
                className="border-r border-primary text-sm px-1 pr-3 w-6 flex justify-center items-center cursor-pointer"
              >
                <i className="fa-solid fa-minus" />
              </div>
              <p>{quantity}</p>
              <div
                onClick={addQuantity}
                className="border-l border-primary text-sm px-1 pl-2 w-6 flex justify-center items-center cursor-pointer"
              >
                <i className="fa-solid fa-plus" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutCard;
