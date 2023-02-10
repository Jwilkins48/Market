import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import CheckOutCard from "../components/CheckOutCard";

function CheckOut() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCheckOut = async () => {
      try {
        const checkOutRef = collection(db, "cartItems");
        const checkOutSnap = await getDocs(checkOutRef);
        //Giving each item id/data
        const cart = [];
        checkOutSnap.forEach((doc) => {
          return cart.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setCart(cart);
        console.log(cart);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCheckOut();
  }, []);
  return (
    <div>
      {cart?.map((cartItem) => (
        <CheckOutCard
          cartItem={cartItem.data}
          id={cartItem.id}
          key={cartItem.id}
        />
      ))}
    </div>
  );
}

export default CheckOut;
