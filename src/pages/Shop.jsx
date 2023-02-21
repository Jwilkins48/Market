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
    <div className="">
      <header className="mt-5 mx-1 lg:w-[73rem]  lg:m-auto">
        <div className="tabs">
          <Link
            className={
              params.gender === "mens"
                ? "text-neutral mx-1 mt-10 text-2xl mr-5 font-bold underline"
                : "text-neutral mx-1 mt-10 text-2xl mr-5"
            }
            to="/shop/mens/shirt"
          >
            Men
          </Link>
          <Link
            className={
              params.gender === "women"
                ? "text-neutral mx-1 mt-10 text-2xl mr-5 font-bold underline"
                : "text-neutral mx-1 mt-10 text-2xl"
            }
            to="/shop/women/tops"
          >
            Women
          </Link>
        </div>

        <div>
          {params.gender === "mens" ? (
            <div className="">
              <ul className="grid grid-cols-4 lg:flex gap-2 mt-2">
                <Link
                  data-theme="emerald"
                  to="/shop/mens/shirt"
                  className={
                    params.clothingItem === "shirt"
                      ? "btn btn-primary underline"
                      : "btn btn-primary"
                  }
                >
                  Tops
                </Link>
                <Link
                  data-theme="emerald"
                  to="/shop/mens/bottoms"
                  className={
                    params.clothingItem === "bottoms"
                      ? "btn btn-primary underline"
                      : "btn btn-primary"
                  }
                >
                  Bottoms
                </Link>
                <Link
                  data-theme="emerald"
                  to="/shop/mens/jacket"
                  className={
                    params.clothingItem === "jacket"
                      ? "btn btn-primary underline"
                      : "btn btn-primary"
                  }
                >
                  Jackets & Coats
                </Link>
                <Link
                  data-theme="emerald"
                  to="/shop/mens/dress-shirt"
                  className={
                    params.clothingItem === "dress-shirt"
                      ? "btn btn-primary underline"
                      : "btn btn-primary"
                  }
                >
                  Button Down Shirts
                </Link>
              </ul>
            </div>
          ) : (
            <div>
              <ul className="grid grid-cols-4 lg:flex gap-2 mt-2">
                <Link
                  data-theme="emerald"
                  to="/shop/women/tops"
                  className={
                    params.clothingItem === "tops"
                      ? "btn btn-primary underline"
                      : "btn btn-primary "
                  }
                >
                  Tops
                </Link>
                <Link
                  data-theme="emerald"
                  to="/shop/women/bottoms"
                  className={
                    params.clothingItem === "bottoms"
                      ? "btn btn-primary underline"
                      : "btn btn-primary"
                  }
                >
                  Bottoms
                </Link>
                <Link
                  data-theme="emerald"
                  to="/shop/women/dresses"
                  className={
                    params.clothingItem === "dresses"
                      ? "btn btn-primary underline"
                      : "btn btn-primary"
                  }
                >
                  Dresses
                </Link>
                <Link
                  data-theme="emerald"
                  to="/shop/women/jacket"
                  className={
                    params.clothingItem === "jacket"
                      ? "btn btn-primary underline"
                      : "btn btn-primary"
                  }
                >
                  Jackets & Coats
                </Link>
              </ul>
            </div>
          )}
        </div>
      </header>
      <div className="divider lg:mx-80 mx-auto"></div>
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
