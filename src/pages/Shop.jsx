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
  }, [params.gender]);
  return (
    <div>
      <header>
        <Link to="/shop/mens/shirt">Men</Link>
        <Link to="/shop/women/shirt">Women</Link>
      </header>
      {clothes?.map((clothing) => (
        <Item clothing={clothing.data} id={clothing.id} key={clothing.id} />
      ))}
    </div>
  );
}

export default Shop;
