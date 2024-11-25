import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { useSnackbar } from "notistack"; // Import hook Notistack
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPass, setConfirm] = useState("");
  const [pass, setPass] = useState("");
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

  const { dispatch } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar(); // Dùng Notistack

  const handleAuthmail = async () => {
    if (!name || !email || !confirmPass || !pass) {
      enqueueSnackbar("Vui lòng nhập đầy đủ thông tin!", {
        variant: "warning",
      });
      return;
    }

    if (confirmPass !== pass) {
      enqueueSnackbar("Password và Confirm Password không giống nhau!", {
        variant: "warning",
      });
      return;
    }

    dispatch({ type: "SET_SCREEN_LOADING", payload: { loading: true } });

    try {
      const response = await axios.post(`${serverUri}/api/user/get-code`, {
        email,
      });

      if (response.status === 200) {
        localStorage.setItem("nameSign", name);
        localStorage.setItem("emailSign", email);
        localStorage.setItem("passSign", pass);

        enqueueSnackbar("Mã xác nhận đã được gửi đến email của bạn!", {
          variant: "success",
        });
        navigate("/auth-code");
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi, vui lòng thử lại sau!", {
        variant: "error",
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
            Sign up your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or{" "}
            <Link
              to="/sign-in"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in your account
            </Link>
          </p>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter confirm password"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleAuthmail}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
