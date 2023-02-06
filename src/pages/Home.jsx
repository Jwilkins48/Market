import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-[93.7vh]">
      <Link className="btn" to="/shop/mens/shirt">
        Shop
      </Link>
    </div>
  );
}

export default Home;
