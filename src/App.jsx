import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import useLocalStorage from "./hooks/useLocalStorage";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import Item from "./pages/Item";
import CheckOut from "./pages/CheckOut";
import Navbar from "./components/Navbar";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import { useState } from "react";
import "animate.css";
import Newsletter from "./pages/Newsletter";
import Footer from "./components/Footer";

function App() {
  const [checkOut, setCheckOut] = useState(0);
  return (
    <div className="app relative">
      <BrowserRouter>
        <Navbar checkOut={checkOut} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Newsletter" element={<Newsletter />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/shop/:gender/:clothingItem"
            element={<Shop checkOut={checkOut} setCheckOut={setCheckOut} />}
          />
          <Route path="/shop/:id" element={<Item />} />
          <Route
            path="/check-out"
            element={<CheckOut setCheckOut={setCheckOut} checkOut={checkOut} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<PrivateRoute />}>
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
