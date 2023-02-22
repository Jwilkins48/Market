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
      <section id="home" className="h:[16rem] lg:h-[42rem] background relative">
        <figure>
          <img
            className="img lg:w-full md:w-[50rem] h-[23rem] lg:h-auto"
            src={store}
            alt="store"
          />
        </figure>

        <div className="absolute lg:right-[17rem] bg-neutral w-[22rem] lg:w-[35rem] opacity-[.9] p-3 lg:p-10 mt-16 rounded-lg shadow-3xl">
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

      <section className="lg:my-32 w-[20rem] lg:w-full mx-auto">
        <div className=" lg:mx-32  flex flex-col gap-5">
          {/* MODEL ONE */}
          <div
            data-aos="fade-left"
            data-aos-offset="10"
            data-aos-duration="1000"
            data-aos-once="true"
            className="flex items-center justify-end flex-col md:flex-row lg:flex-row   mt-10 lg:ml-12"
          >
            {/* md:ml-[-10rem] md:w-[38rem] */}
            <figure>
              <img
                className="imgs w-[22rem] lg:w-[44rem] rounded-2xl lg:mr-60 shadow-2xl"
                src={modelOne}
                alt="clothing model"
              />
            </figure>
            <div className="w-[20rem] md:w-[30rem] lg:w-[50rem] lg:mr-40 md:ml-4">
              <h1 className="text-3xl lg:text-5xl mt-5 lg:mt-0 lg:mb-8">
                Shop The Latest Fashion
              </h1>
              <div className="divider lg:hidden"></div>
              <p className=" w-80 lg:w-full text-xl lg:text-3xl mt-2 text-neutral">
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
            className="flex items-center justify-end flex-col-reverse lg:flex-row mt-10 lg:ml-12"
          >
            <div className="w-[20rem] lg:w-[50rem] lg:mr-40">
              <h1 className="text-3xl lg:text-5xl mt-5 lg:mt-0 lg:mb-8">
                Any Style Any Time
              </h1>
              <div className="divider lg:hidden"></div>
              <p className="text-xl lg:text-3xl mt-2 mb-4 text-neutral">
                Imperdiet dui accumsan sit amet nulla facilisi morbi tempus
                iaculis. Iaculis urna id volutpat lacus laoreet non. Magna sit
                amet purus gravida quis blandit. Habitant morbi tristique
                senectus et netus.
              </p>
            </div>
            <figure>
              <img
                className="imgs w-[22rem] lg:w-[44rem] rounded-2xl lg:mr-60 shadow-2xl"
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
            className="flex items-center justify-end flex-col lg:flex-row mt-10 lg:ml-12"
          >
            <figure>
              <img
                className="imgs w-[22rem] lg:w-[44rem] rounded-2xl lg:mr-60 shadow-2xl"
                src={modelTwo}
                alt="clothing model"
              />
            </figure>
            <div className="w-[20rem] lg:w-[50rem] lg:mr-40">
              <h1 className="text-3xl lg:text-5xl mt-5 lg:mt-0 lg:mb-8">
                High Quality Clothing
              </h1>
              <div className="divider lg:hidden"></div>
              <p className="text-xl lg:text-3xl mt-2 text-neutral">
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
            className="flex items-center justify-end flex-col-reverse lg:flex-row mt-10 mb-32 lg:mb-0 lg:ml-12"
          >
            <div className="w-[20rem] lg:w-[50rem] lg:mr-40">
              <h1 className="text-3xl lg:text-5xl mt-5 lg:mt-0 lg:mb-8">
                Clothes For Any Occasion
              </h1>
              <div className="divider lg:hidden"></div>
              <p className="text-xl lg:text-3xl mt-2 text-neutral">
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
          className="absolute bottom-52 right-12 lg:bottom-12 lg:right-32 flex items-center justify-center"
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
