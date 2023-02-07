import React from "react";

function Item({ clothing, id }) {
  return (
    <div className="flex">
      <div className="card  w-80 h-86 bg-white flex items-center m-auto mt-10 shadow-2xl">
        <figure className="w-40 mt-1">
          <img src={clothing.image[0]} alt={`${clothing.gender} clothing`} />
        </figure>
        <div className="h-26 py-3 mt-2 rounded-b-xl rounded-sm bg-primary w-full">
          <div className="flex justify-between mt-2">
            <div className="ml-3">
              <p className="text-lg font-bold text-[#D6CDA4]">
                {clothing.title}
              </p>
              <p className="mt-2 font-bold text-[#D6CDA4]">${clothing.price}</p>
            </div>
            <div className="mr-3">
              <button className="p-2 rounded-xl text-[#D6CDA4] font-bold ">
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
