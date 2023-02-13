import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import CheckOutCard from "../components/CheckOutCard";

function CheckOut() {
  const [cart, setCart] = useState(null);
  //Total items in cart
  const cartQuantity = cart?.map((item) => item.data.quantity);
  const cartTotal = cartQuantity?.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  //Total price
  const calcPrice = cart?.reduce(
    (a, v) => (a = a + v.data.price * v.data.quantity),
    0
  );

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
  }, []);

  const deleteCartItem = async (id) => {
    if (window.confirm("Remove from cart?")) {
      await deleteDoc(doc(db, "cartItems", id));

      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      console.log("Deleted");
    }
  };

  return (
    <div className=" h-[90vh]">
      <header>
        <h1 className="font-bold text-3xl text-blue-400 text-center mt-8 mb-6 checkOut">
          Check Out
        </h1>
        <div className="divider lg:w-[50rem] lg:mx-auto mx-8 my-6">
          <i className="fa-regular text-blue-300 fa-heart" />
        </div>
      </header>
      <div className="grid grid-cols-1  lg:grid-cols-2 w- lg:w-[50rem] m-auto gap:0 lg:gap-8">
        <div className="">
          {cart?.map((cartItem) => (
            <CheckOutCard
              deleteCartItem={deleteCartItem}
              cartItem={cartItem.data}
              id={cartItem.id}
              key={cartItem.id}
            />
          ))}
        </div>
        <div className="lg:w-[25rem] mx-5 rounded-2xl shadow-2xl bg-[#f2f4f5] mt-4 h-[21rem] relative my-0 mb-3">
          <div className="flex flex-col ml-5 mt-6">
            <p className="text-2xl ">
              {cartTotal} {cart?.length === 1 ? "ITEM" : "ITEMS"}
            </p>
            <div className="divider w-64 lg:w-80 my-3"></div>
            <div className="flex flex-col justify-end gap-2 ">
              <p>Subtotal: ${calcPrice}</p>
              <p>Shipping: $0.00</p>
              <p>Tax: $0.00</p>
              <div className="divider w-32 my-0"></div>
              <h1 className="checkOut mt-1">Total: ${calcPrice}</h1>
              <button className="btn bg-blue-200 hover:bg-blue-300 border-0 mr-5 text-blue-500 mt-2 checkOut">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
