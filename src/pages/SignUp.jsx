import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const [confirmPassword, setConfirmPassword] = useState("");
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: [e.target.value],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("yay");
  };
  return (
    <div className="bg-gray-300 flex h-[92.4vh] justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-[22rem] bg-primary h-[32rem] rounded-lg border border-base-300 shadow-xl p-3 m-2 bg- flex flex-col"
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
          <div className="flex flex-col">
            {/* PASSWORD */}
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
              className="input text-gray-600 bg-base-100 border border-gray-300 h-10 w-full mt-1 text-secondary"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              id="ConfirmPassword"
              value={confirmPassword}
            />
          </div>
        </div>
        {/* SUBMIT */}
        <button className="btn text-gray-600 w-40  m-auto rounded-3xl btn-secondary shadow-xl">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
