import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { useSnackbar } from "notistack"; // Import hook từ Notistack
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { state, dispatch } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar(); // Dùng Notistack
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("Fullname") &&
      localStorage.getItem("Email") &&
      localStorage.getItem("Avatar") &&
      localStorage.getItem("AccessToken")
    ) {
      navigate("/list-room");
    }
  }, []);
  const serverUri =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_PRODUCTION
      : import.meta.env.VITE_API_DEVELOPMENT;

  const handleSignIn = async () => {
    if (email === "" || pass === "") {
      enqueueSnackbar("Please fill all fields!", { variant: "warning" });
      return;
    }

    dispatch({ type: "SET_SCREEN_LOADING", payload: { loading: true } });

    try {
      const response = await axios.post(`${serverUri}/api/user/sign-in`, {
        email: email,
        password: pass,
      });
      console.log(response);

      if (response.status === 200) {
        const { Check, AccessToken } = response.data;
        console.log(Check._id);
        dispatch({
          type: "USER_LOGIN",
          payload: {
            name: Check.fullName,
            email: Check.email,
            avatar: Check.avatar,
            accessToken: AccessToken,
            id: Check._id,
          },
        });

        dispatch({
          type: "SET_HAS_LOGIN",
          payload: { login: true },
        });

        enqueueSnackbar("Sign in successful!", { variant: "success" });
        navigate("/list-room");
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Sign in failed! Please try again.", {
        variant: "warning",
      });
    } finally {
      dispatch({ type: "SET_SCREEN_LOADING", payload: { loading: false } });
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="min-h-screen w-full bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <Link
            to="/sign-up"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            <p className="mt-2 text-center text-sm text-gray-600 max-w">
              Or create an account
            </p>
          </Link>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPass(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSignIn}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
