import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import CheckOutCard from "../components/CheckOutCard";

function CheckOut({ setCheckOut }) {
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

  //Total price
  const calcPrice = cart?.reduce(
    (a, v) => (a = a + v.data.price * v.data.quantity),
    0
  );

  return (
    <div className="relative h-[90vh]">
      {cart?.map((cartItem) => (
        <CheckOutCard
          setCheckOut={setCheckOut}
          cartItem={cartItem.data}
          id={cartItem.id}
          key={cartItem.id}
        />
      ))}

      <h1 className="absolute bottom-10 left-8 font-bold text-2xl text-primary">
        Total: ${calcPrice}
      </h1>
    </div>
  );
}

export default CheckOut;
