import { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: [e.target.value],
    }));
  };
  return (
    <div className="flex h-[80vh] justify-center items-center">
      <form className="w-full h-[22rem] rounded shadow-xl p-2 m-2 bg-secondary flex flex-col">
        <header className="grid grid-cols-3 justify-center items-center text-center">
          <h1 className="font-bold ">Sign in</h1>
          <div className="w-10 text-center mx-auto divider"></div>
          <h1>Sign up</h1>
        </header>
        <div className="flex flex-col h-40 justify-around">
          <div>
            <label className="font-bold mr-2 text-primary" htmlFor="email">
              email
            </label>
            <input
              className="input bg-neutral h-10 w-full mt-1 text-secondary"
              onChange={onChange}
              type="text"
              id="email"
              value={email}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-primary mr-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="input bg-neutral h-10 w-full mt-1 text-secondary"
                onChange={onChange}
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
              />
              <p onClick={() => setShowPassword(!showPassword)}>
                {!showPassword ? (
                  <i className="fa-regular fa-eye absolute top-4 right-5 text-secondary" />
                ) : (
                  <i className="fa-solid fa-eye-slash absolute top-4 right-5 text-secondary" />
                )}
              </p>
            </div>
          </div>
        </div>
        <button className="btn mt-10 btn-primary shadow-xl">Sign In</button>
        <Link className="link-primary font-bold mt-3" to="/sign-up">
          Sign Up
        </Link>
      </form>
    </div>
  );
}

export default SignIn;
