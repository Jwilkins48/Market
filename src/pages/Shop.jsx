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
      <header className="mt-5 mx-1 lg:w-[73rem]  lg:m-auto">
        <div className="tabs">
          <Link
            className={
              params.gender === "mens"
                ? "text-neutral mt-10 text-[30px] mr-5 font-bold underline"
                : "text-neutralm t-10 text-[30px] mr-5"
            }
            to="/shop/mens/shirt"
          >
            Men
          </Link>
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
            <div className="">
              <ul className="grid grid-cols-4 lg:flex items-center gap-5 mt-5">
                <Link
                  to="/shop/mens/shirt"
                  className={
                    params.clothingItem === "shirt"
                      ? "text-[21px] font-bold underline text-primary"
                      : "text-[20px] text-neutral"
                  }
                >
                  Tops
                </Link>
                <Link
                  to="/shop/mens/bottoms"
                  className={
                    params.clothingItem === "bottoms"
                      ? "text-[21px] font-bold underline text-primary"
                      : "text-[20px] text-neutral"
                  }
                >
                  Bottoms
                </Link>
                <Link
                  to="/shop/mens/jacket"
                  className={
                    params.clothingItem === "jacket"
                      ? "text-[21px] font-bold underline text-primary"
                      : "text-[20px] text-neutral"
                  }
                >
                  Jackets & Coats
                </Link>
                <Link
                  to="/shop/mens/dress-shirt"
                  className={
                    params.clothingItem === "dress-shirt"
                      ? "text-[21px] font-bold underline text-primary"
                      : "text-[20px] text-neutral"
                  }
                >
                  Button Down Shirts
                </Link>
              </ul>
            </div>
          ) : (
            <div>
              <ul className="grid grid-cols-4 lg:flex items-center gap-5 mt-5">
                <Link
                  to="/shop/women/tops"
                  className={
                    params.clothingItem === "tops"
                      ? "text-[21px] font-bold underline text-primary"
                      : "text-[20px] text-neutral"
                  }
                >
                  Tops
                </Link>
                <Link
                  to="/shop/women/bottoms"
                  className={
                    params.clothingItem === "bottoms"
                      ? "text-[21px] font-bold underline text-primary"
                      : "text-[20px] text-neutral"
                  }
                >
                  Bottoms
                </Link>
                <Link
                  to="/shop/women/dresses"
                  className={
                    params.clothingItem === "dresses"
                      ? "text-[21px] font-bold underline text-primary"
                      : "text-[20px] text-neutral"
                  }
                >
                  Dresses
                </Link>
                <Link
                  to="/shop/women/jacket"
                  className={
                    params.clothingItem === "jacket"
                      ? "text-[21px] font-bold underline text-primary"
                      : "text-[20px] text-neutral"
                  }
                >
                  Jackets & Coats
                </Link>
              </ul>
            </div>
          )}
        </div>
      </header>
      <div className="divider lg:mx-80 lg:mb-10 mx-auto"></div>
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
