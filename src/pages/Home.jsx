import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../assets/clothes.jpg";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../../firebase.config";
import FeaturedCard from "../components/FeaturedCard";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import modelOne from "../assets/model1.jpg";
import modelTwo from "../assets/model2.jpg";
import modelThree from "../assets/model3.jpg";
import modelFour from "../assets/model4.jpg";
import Footer from "../components/Footer";

function Home() {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    AOS.init();
  }, []);

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
      <section id="home" className="h:[16rem] lg:h-[40rem] background relative">
        <figure>
          <img
            className="img lg:w-full md:w-[50rem] h-[23rem] lg:h-auto"
            src={store}
            alt="store"
          />
        </figure>

        <div className="absolute lg:right-[17rem] bg-neutral w-[22rem] lg:w-[35rem] opacity-[.9] p-3 lg:p-10 rounded-lg shadow-3xl">
          <p
            data-aos-duration="1500"
            data-aos="fade-left"
            className="text-red-100 text-4xl font-bold w-[20rem] lg:w-[31rem] mb-1 checkOut "
          >
            Find Your New Favorite Outfit In Daisies Closet!
          </p>
          <Link
            data-aos-duration="1800"
            data-aos="fade-up"
            data-theme="emerald"
            className="btn btn-primary h-14 mt-3 app shop"
            to="/shop/mens/shirt"
          >
            Shop
          </Link>
        </div>
      </section>
      <section className="text-center">
        <div
          data-aos="fade-up"
          data-aos-offset="300"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <h1 className="mt-24 text-5xl text-neutral featured ">
            Featured Items
          </h1>

          <div className="divider lg:w-[50rem] lg:mx-auto mx-8 my-14">
            <i className="fa-regular my-2 text-green-500 fa-heart" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-16">
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

      <section className="my-32">
        {/* MODEL ONE */}
        <div className="ml-7 lg:mx-48 flex flex-col gap-5">
          <div
            data-aos="fade-left"
            data-aos-offset="10"
            data-aos-duration="1000"
            data-aos-once="true"
            className="grid grid-cols-1 lg:grid-cols-2 items-center w-96 lg:w-full"
          >
            <figure>
              <img
                className="imgs w-[22rem] lg:w-[44rem] rounded-2xl shadow-2xl mb-3 lg:mb-0"
                src={modelOne}
                alt="clothing model"
              />
            </figure>
            <div>
              <h1 className="text-5xl mb-8">Shop The Latest Fashion</h1>
              <p className=" w-80 lg:w-full text-xl lg:text-3xl  mt-2 line text-neutral">
                Imperdiet dui accumsan sit amet nulla facilisi morbi tempus
                iaculis. Iaculis urna id volutpat lacus laoreet non. Magna sit
                amet purus gravida quis blandit. Habitant morbi tristique
                senectus et netus. Habitant morbi tristique senectus et netus.
              </p>
            </div>
          </div>
          {/* MODEL TWO */}
          <div
            data-aos="fade-right"
            data-aos-offset="10"
            data-aos-duration="1000"
            data-aos-once="true"
            className="grid grid-cols-1 lg:grid-cols-2 items-center flex justify-end mt-10"
          >
            <div className="mr-12">
              <h1 className="text-5xl mb-8">Any Style Any Time</h1>
              <p className="text-xl lg:text-3xl mt-2 mb-4 line text-neutral">
                Imperdiet dui accumsan sit amet nulla facilisi morbi tempus
                iaculis. Iaculis urna id volutpat lacus laoreet non. Magna sit
                amet purus gravida quis blandit. Habitant morbi tristique
                senectus et netus.
              </p>
            </div>
            <figure>
              <img
                className="imgs w-[22rem] lg:w-[44rem] rounded-2xl mr-6 mb-5 lg:mr-0 lg:mb-0 lg:ml-8 shadow-2xl"
                src={modelThree}
                alt="clothing model"
              />
            </figure>
          </div>
          {/* MODEL THREE */}
          <div
            data-aos="fade-left"
            data-aos-offset="200"
            data-aos-duration="1000"
            data-aos-once="true"
            className="grid grid-cols-1 lg:grid-cols-2 items-center flex justify-end mt-10"
          >
            <figure>
              <img
                className="imgs w-[22rem] lg:w-[44rem] rounded-2xl shadow-2xl"
                src={modelTwo}
                alt="clothing model"
              />
            </figure>
            <div>
              <h1 className="text-5xl mb-8">High Quality Clothing</h1>
              <p className="text-xl lg:text-3xl mt-2 line text-neutral">
                Imperdiet dui accumsan sit amet nulla facilisi morbi tempus
                iaculis. Iaculis urna id volutpat lacus laoreet non. Magna sit
                amet purus gravida quis blandit.
              </p>
            </div>
          </div>
          {/* MODEL FOUR */}
          <div
            data-aos="fade-right"
            data-aos-offset="250"
            data-aos-duration="1000"
            data-aos-once="true"
            className="flex items-center justify-end flex-col-reverse lg:flex-row mt-10"
          >
            <div className="w-[20rem] lg:w-[50rem] lg:mr-40">
              <h1 className="text-5xl mb-8">Clothes For Any Occasion</h1>
              <p className="text-xl lg:text-3xl mt-2 line text-neutral">
                Imperdiet dui accumsan sit amet nulla facilisi morbi tempus
                iaculis. Iaculis urna id volutpat lacus laoreet non. Magna sit
                amet purus gravida quis blandit. Habitant morbi tristique
                senectus et netus!
              </p>
            </div>
            <figure>
              <img
                className="imgs w-[22rem] lg:w-[44rem] rounded-2xl lg:mr-60 shadow-2xl"
                src={modelFour}
                alt="clothing model"
              />
            </figure>
          </div>
        </div>
        <a
          className="absolute bottom-12 right-32 flex items-center justify-center"
          href="#home"
        >
          <i className="fa-solid fa-chevron-up btn  shadow-2xl bg-blue-300 rounded-3xl border-secondary hover:bg-blue-400 topBtn" />
        </a>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
