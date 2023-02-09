import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import Item from "./pages/Item";
import CheckOut from "./pages/CheckOut";
import Navbar from "./components/Navbar";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/shop/:gender/:clothingItem" element={<Shop />} />
          <Route path="/shop/:id" element={<Item />} />
          <Route path="/check-out" element={<CheckOut />} />
          <Route path="/profile" element={<Profile />} />
          //Must be signed in to view wishlist
          <Route path="/wishlist" element={<PrivateRoute />}>
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
