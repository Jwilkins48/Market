import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function FeaturedCard({ clothing, id }) {
  const navigate = useNavigate();

  return (
    <div className="flex mb-10">
      <div className="card mb-4 w-[30rem] h-[23rem] items-center  bg-[#f2f4f5] m-auto mt-4 shadow-2xl">
        <figure
          onClick={() => navigate(`/shop/${id}`)}
          className="w-60 mb-16 cursor-pointer"
        >
          <img
            className="mb-[-40px]"
            src={clothing.image[0]}
            alt={`${clothing.gender} clothing`}
          />
        </figure>
        <div className="h-26 py-3 mt-2 rounded-b-xl  absolute bottom-0 w-full">
          <div className="flex justify-between mt-2 items-center mb-2">
            <div className="ml-3">
              <p className="text-lg font-bold text-neutral cursor-pointer">
                {clothing.title}
              </p>
            </div>
            <p className="mt-2 mr-3 font-bold text-neutral">
              ${clothing.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCard;
