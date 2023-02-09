import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase.config";
import Card from "../components/Card";
import { collection, getDocs, query, where } from "firebase/firestore";

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
    <div>
      <header className="mt-5 mx-1 lg:w-[73rem] lg:mt-10 lg:m-auto">
        <div className="tabs">
          <Link
            data-theme="corporate"
            className="tab tab-lifted h-10 bg-secondary text-neutral mx-1 font-bold"
            to="/shop/mens/shirt"
          >
            Men
          </Link>
          <Link
            data-theme="corporate"
            className="tab tab-lifted h-10 bg-secondary text-neutral font-bold"
            to="/shop/women/tops"
          >
            Women
          </Link>
        </div>

        <div>
          {params.gender === "mens" ? (
            <div className="">
              <ul className="grid grid-cols-4 lg:flex gap-2 mt-2 ml-1">
                <Link
                  data-theme="emerald"
                  to="/shop/mens/shirt"
                  className="btn btn-primary "
                >
                  Tops
                </Link>
                <Link
                  data-theme="emerald"
                  to="/shop/mens/bottoms"
                  className="btn  btn-primary"
                >
                  Bottoms
                </Link>
                <Link
                  data-theme="emerald"
                  to="/shop/mens/jacket"
                  className="btn  btn-primary"
                >
                  Jackets & Coats
                </Link>
                <Link
                  data-theme="emerald"
                  to="/shop/mens/dress-shirt"
                  className="btn btn-primary"
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
                  className="btn  btn-primary"
                >
                  Tops
                </Link>
                <Link
                  data-theme="emerald"
                  to="/shop/women/bottoms"
                  className="btn btn-primary"
                >
                  Bottoms
                </Link>
                <Link
                  data-theme="emerald"
                  to="/shop/women/dresses"
                  className="btn btn-primary"
                >
                  Dresses
                </Link>
                <Link
                  data-theme="emerald"
                  to="/shop/women/jacket"
                  className="btn btn-primary"
                >
                  Jackets & Coats
                </Link>
              </ul>
            </div>
          )}
        </div>
      </header>
      <div className="divider lg:mx-40 mx-auto"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center lg:w-[80rem] lg:m-auto">
        {clothes?.map((clothing) => (
          <Card clothing={clothing.data} id={clothing.id} key={clothing.id} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
