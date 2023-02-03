import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [cartDropdown, setCartDropdown] = useState(false);
  const handleClick = (path) => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
    navigate(path);
  };
  return (
    <div className="navbar bg-primary shadow-xl">
      <div className="flex-1">
        <a
          onClick={() => navigate("/")}
          className="btn btn-ghost normal-case text-accent text-3xl"
        >
          Daisies
        </a>
      </div>
      <div>
        {/* WISHLIST */}
        <button
          onClick={() => navigate("/wishlist")}
          className="btn btn-ghost btn-circle text-accent text-lg"
        >
          <i className="fa-solid fa-heart" />
        </button>
        {/* USER  */}
        <div
          onClick={() => setDropdown(!dropdown)}
          className="dropdown dropdown-end "
        >
          <label tabIndex={0} className="btn btn-ghost btn-circle text-accent">
            <div className="w-10 rounded-full flex items-center justify-center text-lg">
              <i className="fa-regular fa-user " />
            </div>
          </label>
          <ul
            tabIndex={0}
            className={
              dropdown
                ? "menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                : "hidden"
            }
          >
            <li>
              <a
                onClick={() => handleClick("/sign-in")}
                className="justify-between"
              >
                Sign In
              </a>
            </li>
            <li>
              <a onClick={() => handleClick("/sign-up")}>Sign Up</a>
            </li>

            {/* <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li> */}
          </ul>
        </div>
        {/* SHOPPING CART */}
        <div
          className="dropdown dropdown-end"
          onClick={() => setCartDropdown(!cartDropdown)}
        >
          <label tabIndex={0} className="btn btn-ghost btn-circle text-accent">
            <div className="indicator ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {/* CHANGE TO CHECKOUT LENGTH  */}
              <span className="badge badge-sm indicator-item">0</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className={
              cartDropdown
                ? "mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                : "hidden"
            }
          >
            <div className="card-body">
              {/* CHANGE TO CHECKOUT ITEM LENGTH/PRICE  */}
              <span className="font-bold text-lg">0 Items</span>
              <span className="text-info">Subtotal: $0</span>
              <div className="card-actions">
                <button
                  onClick={() => handleClick("/check-out")}
                  className="btn btn-primary btn-block"
                >
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
