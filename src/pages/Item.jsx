import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase.config";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import ItemCard from "../components/ItemCard";
function Item() {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  //Fetch clothing with matching id
  useEffect(() => {
    const fetchClothes = async () => {
      const itemRef = doc(db, "clothing", params.id);
      const itemSnap = await getDoc(itemRef);

      if (itemSnap.exists()) {
        setItem(itemSnap.data());
        setQuantity(itemSnap.data().quantity);
        setLoading(false);
      }
    };
    fetchClothes();
  }, [params.id]);

  return (
    <div>
      <ItemCard
        item={item}
        quantity={quantity}
        setQuantity={setQuantity}
        id={params.id}
        key={params.id}
      />
    </div>
  );
}

export default Item;
