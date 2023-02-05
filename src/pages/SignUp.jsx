import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../../firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password } = formData;
  const navigate = useNavigate();

  //Create User Account
  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        //Create user with form info
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        updateProfile(auth.currentUser, { displayName: name });

        //copy of user info with password removed
        const formDataCopy = { ...formData };
        delete formDataCopy.password;

        //Placing user info into users collection
        await setDoc(doc(db, "users", user.uid), formDataCopy);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords must match");
    }

    if (password.length < 6) {
      alert("Password must be greater than 6 characters");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="bg-gray-300 flex h-[92.4vh] justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-[23rem] bg-primary h-[32rem] rounded-lg border border-base-300 shadow-xl p-3 m-2 bg- flex flex-col"
      >
        {/* SIGN IN / SIGN UP */}
        <header className="grid grid-cols-3 my-2 justify-center items-center text-center signIn">
          <Link className="text-xl text-secondary mr-2" to="/sign-in">
            Sign in
          </Link>
          <div className="w-20 text-primary text-center mx-auto divider">
            <i className="fa-regular text-yellow-200 fa-heart" />
          </div>
          <h1 className="font-bold text-yellow-200 ml-2 text-xl">Sign up</h1>
        </header>
        {/* USER NAME */}
        <div className="flex flex-col my-20 gap-3 h-40 justify-around">
          <div>
            <label className="font-bold mr-2 text-secondary" htmlFor="name">
              Name
            </label>
            <input
              className="input text-gray-600 bg-base-100 border border-gray-300 h-10 w-full mt-1 text-secondary "
              onChange={onChange}
              type="text"
              id="name"
              value={name}
            />
          </div>
          {/* EMAIL*/}
          <div>
            <label className="font-bold mr-2 text-secondary" htmlFor="email">
              Email
            </label>
            <input
              className="input text-gray-600 bg-base-100 border border-gray-300 h-10 w-full mt-1 text-secondary "
              onChange={onChange}
              type="text"
              id="email"
              value={email}
            />
          </div>
          {/* PASSWORD */}
          <div className="flex flex-col">
            <label className="font-bold text-secondary mr-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="input text-gray-600 bg-base-100 border border-gray-300 h-10 w-full mt-1 text-secondary"
                onChange={onChange}
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
              />
              {/* SHOW PASSWORD */}
              <p onClick={() => setShowPassword(!showPassword)}>
                {!showPassword ? (
                  <i className="fa-regular text-gray-600 fa-eye absolute top-4 right-5 text-secondary" />
                ) : (
                  <i className="fa-solid text-gray-600 fa-eye-slash absolute top-4 right-5 text-secondary" />
                )}
              </p>
            </div>
            {/* CONFIRM PASSWORD */}
            <label
              className="font-bold text-secondary mr-2 mt-4"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
              className="input text-gray-600 bg-base-100 border border-gray-300 h-10 w-full mt-1 text-secondary"
              type={showPassword ? "text" : "password"}
            />
          </div>
        </div>
        {/* SUBMIT */}
        <button className="btn bg-yellow-200 text-gray-500 border-0 mt-8">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
