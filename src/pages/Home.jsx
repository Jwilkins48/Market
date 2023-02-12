import React from "react";
import { Link } from "react-router-dom";
import store from "../assets/clothes.jpg";
// import store from "../assets/store.jpg";

function Home() {
  return (
    <div className="h:[16rem] lg:h-[40rem] background relative">
      <figure>
        <img className="img" src={store} alt="store" />
      </figure>
      <div className="absolute lg:right-[22rem]">
        <p className="text-red-100 text-4xl font-bold w-[31rem] checkOut">
          Find Your New Favorite Outfit In Daisies Closet
        </p>
        <Link
          data-theme="emerald"
          className="btn btn-primary h-14 mt-3 app shop"
          to="/shop/mens/shirt"
        >
          Shop
        </Link>
      </div>
    </div>
  );
}

export default Home;
