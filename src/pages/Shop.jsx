import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase.config";
import Card from "../components/Card";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Footer from "../components/Footer";

function Shop() {
  const [clothes, setClothes] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const clothingRef = collection(db, "clothing");
        // Query correct clothing type/gender
        const q = query(
          clothingRef,
          where("gender", "==", params.gender),
          where("clothingType", "==", params.clothingItem)
        );
        const querySnap = await getDocs(q);
        //Giving each item id/data
        const clothes = [];
        querySnap.forEach((doc) => {
          return clothes.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setClothes(clothes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClothes();
  }, [params.gender, params.clothingItem]);

  return (
    <div className="mt-16">
      <header className="mt-5 mx-1 lg:w-[73rem] lg:m-auto flex justify-center lg:flex-col">
        <div className="tabs">
          <div className="mr-4 relative">
            <Link
              className={
                params.gender === "mens"
                  ? "text-neutral mt-10 text-[30px] font-bold underline"
                  : "text-neutralm t-10 text-[30px] "
              }
              to="/shop/mens/shirt"
            >
              Men
            </Link>
            <button
              onClick={() => setDropDown(!dropDown)}
              className="sm:hidden md:hidden lg:hidden"
            >
              <i className="fa-solid fa-chevron-down ml-2 cursor-pointer text-gray-500" />
            </button>

            <div
              className={
                dropDown
                  ? "h-40 bg-accent absolute top-10 z-10 w-48 rounded-xl shadow-xl"
                  : "hidden"
              }
            >
              <ul>
                <li>Shirts</li>
                <li>Bottoms</li>
                <li>Jackets & Coats</li>
                <li>Button Downs</li>
              </ul>
            </div>
          </div>
          <Link
            className={
              params.gender === "women"
                ? "text-neutral mt-10 text-[30px] mr-5 font-bold underline"
                : "text-neutral  mt-10 text-[30px]"
            }
            to="/shop/women/tops"
          >
            Women
          </Link>
        </div>
        <div>
          {params.gender === "mens" ? (
            <div className="hidden sm:block md:block lg:block xl:block">
              <ul className="flex items-center mt-2 gap-1 lg:gap-5 lg:mt-5 text-center">
                <Link
                  to="/shop/mens/shirt"
                  className={
                    params.clothingItem === "shirt"
                      ? "lg:text-[21px] font-bold underline text-gray-600"
                      : "lg:text-[20px] text-neutral"
                  }
                >
                  Tops
                </Link>
                <i className="fa-solid fa-heart text-xs text-primary" />

                <Link
                  to="/shop/mens/bottoms"
                  className={
                    params.clothingItem === "bottoms"
                      ? "lg:text-[21px] font-bold underline text-primary"
                      : "lg:text-[20px] text-neutral"
                  }
                >
                  Bottoms
                </Link>
                <i className="fa-solid fa-heart text-xs text-primary" />
                <Link
                  to="/shop/mens/jacket"
                  className={
                    params.clothingItem === "jacket"
                      ? "lg:text-[21px] font-bold underline text-primary"
                      : "lg:text-[20px] text-neutral"
                  }
                >
                  Jackets & Coats
                </Link>
                <i className="fa-solid fa-heart text-xs text-primary" />
                <Link
                  to="/shop/mens/dress-shirt"
                  className={
                    params.clothingItem === "dress-shirt"
                      ? "lg:text-[21px] font-bold underline text-primary"
                      : "lg:text-[20px] text-neutral"
                  }
                >
                  Button Down Shirts
                </Link>
                <i className="fa-solid fa-heart text-xs text-primary" />
              </ul>
            </div>
          ) : (
            <div>
              <ul className="grid grid-cols-4 lg:flex items-center gap-5 mt-5 text-center">
                <Link
                  to="/shop/women/tops"
                  className={
                    params.clothingItem === "tops"
                      ? "lg:text-[21px] font-bold underline text-primary"
                      : "lg:text-[20px] text-neutral"
                  }
                >
                  Tops
                </Link>
                <Link
                  to="/shop/women/bottoms"
                  className={
                    params.clothingItem === "bottoms"
                      ? "lg:text-[21px] font-bold underline text-primary"
                      : "lg:text-[20px] text-neutral"
                  }
                >
                  Bottoms
                </Link>
                <Link
                  to="/shop/women/dresses"
                  className={
                    params.clothingItem === "dresses"
                      ? "lg:text-[21px] font-bold underline text-primary"
                      : "lg:text-[20px] text-neutral"
                  }
                >
                  Dresses
                </Link>
                <Link
                  to="/shop/women/jacket"
                  className={
                    params.clothingItem === "jacket"
                      ? "tlg:ext-[21px] font-bold underline text-primary"
                      : "lg:text-[20px] text-neutral"
                  }
                >
                  Jackets & Coats
                </Link>
              </ul>
            </div>
          )}
        </div>
      </header>
      <div className="divider  lg:mx-96 lg:mb-10 mx-16"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center lg:w-[80rem] lg:m-auto pb-12">
        {clothes?.map((clothing) => (
          <Card
            InWishlist={false}
            clothing={clothing.data}
            id={clothing.id}
            key={clothing.id}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
