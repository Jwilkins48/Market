import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchCheckOut();
  }, []); //cart

  //Total price
  const calcPrice = cart?.reduce(
    (a, v) => (a = a + v.data.price * v.data.quantity),
    0
  );

  return (
    <div className="relative h-[90vh]">
      <header>
        <h1 className="font-bold text-3xl text-blue-400 text-center mt-8 mb-6 checkOut">
          Check Out
        </h1>
        <div className="divider mx-5">
          <i className="fa-regular text-blue-300 fa-heart" />
        </div>
      </header>
      {cart?.map((cartItem) => (
        <CheckOutCard
          setCheckOut={setCheckOut}
          cartItem={cartItem.data}
          id={cartItem.id}
          key={cartItem.id}
        />
      ))}

      <p className="absolute bottom-10 left-8 font-bold text-2xl text-primary">
        Total: ${`${calcPrice}`}{" "}
      </p>
    </div>
  );
}

export default CheckOut;
