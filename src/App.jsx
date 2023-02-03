import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import Item from "./pages/Item";
import CheckOut from "./pages/CheckOut";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop:id" element={<Item />} />
          <Route path="/check-out" element={<CheckOut />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
