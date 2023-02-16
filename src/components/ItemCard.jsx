import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

function ItemCard({ item, id, quantity, setQuantity }) {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  console.log(quantity);

  const handleAddToCart = async () => {
    const docRef = doc(db, "cartItems", params.id);
    const docSnap = await getDoc(docRef);
    setQuantity((prevCheckOut) => prevCheckOut + 1);

    //If item is in cart add quantity - else add to collection
    if (!docSnap.exists()) {
      await setDoc(doc(db, "cartItems", id), item);
      setLoading(false);
      alert("added to cart!");
    } else {
      await updateDoc(doc(db, "clothing", id), {
        quantity: quantity + 1,
      });

      await updateDoc(doc(db, "cartItems", id), {
        quantity: quantity + 1,
      });
      // console.log(`quantity: ${quantity + 1}`);
      setLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center m-auto lg:w-[50rem] lg:h-[85vh]">
      <div>
        <figure>
          <img className="lg:w-96" src={item?.image[0]} alt="selected item" />
        </figure>
      </div>
      <div className="flex flex-col">
        <h3>{item?.title}</h3>
        <p>{item?.price}</p>
        <select>
          <option value="0">Size</option>
          <option value="1">Small</option>
          <option value="2">Medium</option>
          <option value="3">Large</option>
          <option value="4">XL</option>
        </select>
        <button onClick={() => handleAddToCart(params.id)}>Add To Cart</button>
      </div>
    </div>
  );
}

export default ItemCard;
