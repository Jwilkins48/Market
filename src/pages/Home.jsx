import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../assets/clothes.jpg";
import { collection, getDocs, query, limit, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import FeaturedCard from "../components/FeaturedCard";

function Home() {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const clothingRef = collection(db, "clothing");
        // Query correct clothing type/gender
        const q = query(clothingRef, limit(4));
        const querySnap = await getDocs(q);
        //Giving each item id/data
        const featured = [];
        querySnap.forEach((doc) => {
          return featured.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setFeatured(featured);
        console.log(featured);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      <section className="h:[16rem] lg:h-[40rem] background relative">
        <figure>
          <img
            className="img lg:w-full md:w-[50rem] h-[23rem] lg:h-auto"
            src={store}
            alt="store"
          />
        </figure>
        <div className="absolute lg:right-[22rem] bg-neutral w-[22rem] lg:w-[35rem] opacity-[.9] p-3 lg:p-10 rounded-lg shadow-3xl">
          <p className="text-red-100 text-4xl font-bold w-[20rem] lg:w-[31rem] mb-1 checkOut ">
            Find Your New Favorite Outfit In Daisies Closet!
          </p>
          <Link
            data-theme="emerald"
            className="btn btn-primary h-14 mt-3 app shop"
            to="/shop/mens/shirt"
          >
            Shop
          </Link>
        </div>
      </section>

      <section className="text-center">
        <h1 className="mt-24 text-5xl text-neutral featured">Featured Items</h1>
        <div className="divider lg:w-[50rem] lg:mx-auto mx-8 my-14">
          <i className="fa-regular my-2 text-green-500 fa-heart" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {featured?.map((featured) => (
            <FeaturedCard
              InWishlist={false}
              clothing={featured.data}
              id={featured.id}
              key={featured.id}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
