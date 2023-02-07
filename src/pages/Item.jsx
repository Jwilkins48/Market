import React from "react";

function Item({ clothing, id }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4">
      <div className="card w-80 h-86 bg-white flex items-center m-auto mt-10 shadow-2xl">
        <figure className="w-32 mt-2">
          <img src={clothing.image[0]} alt={`${clothing.gender} clothing`} />
        </figure>
        <div className="divider w-72 mx-auto"></div>
        <div className="mb-3 mt-[-10px] ml-8">
          <p>${clothing.price}</p>
          <button className="p-2 rounded-xl btn-accent">Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default Item;
