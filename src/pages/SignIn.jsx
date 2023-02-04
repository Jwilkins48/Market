import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        navigate("/");
      }
    } catch (error) {
      alert("No User");
    }
  };
  return (
    <div className="bg-gray-300 flex h-[90vh] justify-center items-center">
      <form
        onSubmit={onsubmit}
        className="w-[22rem] bg-primary h-[22rem] rounded-lg border border-base-300 shadow-xl p-3 m-2 bg- flex flex-col"
      >
        {/* SIGN IN / SIGN UP */}
        <header className="grid grid-cols-3 my-2 justify-center items-center text-center signIn">
          <h1 className="font-bold text-yellow-200 ml-2 text-xl">Sign in</h1>
          <div className="w-20 text-primary text-center mx-auto divider">
            <i className="fa-regular text-yellow-200 fa-heart" />
          </div>
          <Link className="text-xl text-secondary mr-2" to="/sign-up">
            Sign up
          </Link>
        </header>

        <div className="flex flex-col h-40 justify-around">
          <div>
            <label className="font-bold mr-2 text-secondary" htmlFor="email">
              Email
            </label>
            <input
              className="input text-gray-600 bg-base-100 border border-gray-300 h-10 w-full mt-1 text-secondary signIn"
              onChange={onChange}
              type="text"
              id="email"
              value={email}
            />
          </div>
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
              <p onClick={() => setShowPassword(!showPassword)}>
                {!showPassword ? (
                  <i className="fa-regular text-gray-600 fa-eye absolute top-4 right-5 text-secondary" />
                ) : (
                  <i className="fa-solid text-gray-600 fa-eye-slash absolute top-4 right-5 text-secondary" />
                )}
              </p>
            </div>
          </div>
        </div>
        <button className="btn text-gray-600 w-40 m-auto rounded-3xl btn-secondary shadow-xl">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
