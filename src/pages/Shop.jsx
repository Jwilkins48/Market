import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase.config";
import Item from "./Item";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

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
      <header className="mt-5 mx-1">
        <Link className="btn mr-3" to="/shop/mens/shirt">
          Men
        </Link>
        <Link className="btn" to="/shop/women/shirt">
          Women
        </Link>
        <div>
          {params.gender === "mens" ? (
            <div>
              <ul className="grid grid-cols-4 lg:flex gap-2 mt-2">
                <Link to="/shop/mens/shirt" className="btn">
                  Tops
                </Link>
                <Link to="/shop/mens/bottoms" className="btn">
                  Bottoms
                </Link>
                <Link to="/shop/mens/jacket" className="btn">
                  Jackets & Coats
                </Link>
                <Link to="/shop/mens/dress-shirt" className="btn">
                  Button Down Shirts
                </Link>
              </ul>
            </div>
          ) : (
            <div>
              <ul className="grid grid-cols-4 lg:flex gap-2 mt-2">
                <Link to="/shop/women/tops" className="btn">
                  Tops
                </Link>
                <Link to="/shop/women/dresses" className="btn">
                  Dresses
                </Link>
                <Link to="/shop/women/bottoms" className="btn">
                  Bottoms
                </Link>
                <Link to="/shop/women/jacket" className="btn">
                  Jackets & Coats
                </Link>
              </ul>
            </div>
          )}
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center">
        {clothes?.map((clothing) => (
          <Item clothing={clothing.data} id={clothing.id} key={clothing.id} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
