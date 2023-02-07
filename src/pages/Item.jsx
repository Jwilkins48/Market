import React from "react";

function Item({ clothing, id }) {
  return (
    <div className="flex">
      <div className="card mb-4  w-80 h-[24rem] relative  bg-white flex items-center m-auto mt-4 shadow-2xl">
        <figure className="w-[53%] mt-5">
          <img src={clothing.image[0]} alt={`${clothing.gender} clothing`} />
        </figure>
        <div className="h-26 py-3 mt-2 rounded-b-xl  absolute bottom-0 w-full">
          <div className="flex justify-between mt-2">
            <div className="ml-3 mb-2">
              <p className="text-lg font-bold text-neutral">{clothing.title}</p>
              <p className="mt-2 font-bold text-neutral">${clothing.price}</p>
            </div>
            <div className="mr-3">
              <button className="p-2 rounded-xl text-neutral font-bold ">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
