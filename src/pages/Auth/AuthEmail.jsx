import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { useSnackbar } from "notistack"; // Import hook từ Notistack

const AuthEmail = () => {
  const [code, setCode] = useState("");
  const { dispatch } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar(); // Dùng Notistack
  const serverUri =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_PRODUCTION
      : import.meta.env.VITE_API_DEVELOPMENT;

  const name = localStorage.getItem("nameSign");
  const email = localStorage.getItem("emailSign");
  const pass = localStorage.getItem("passSign");

  const navigate = useNavigate();

  const handleAuth = async () => {
    dispatch({ type: "SET_SCREEN_LOADING", payload: { loading: true } });

    try {
      const authResponse = await axios.post(`${serverUri}/api/user/auth-code`, {
        email,
        code,
      });

      if (authResponse.status === 200) {
        const signUpResponse = await axios.post(
          `${serverUri}/api/user/sign-up`,
          {
            email,
            password: pass,
            fullName: name,
          }
        );

        if (signUpResponse.status === 200) {
          enqueueSnackbar(signUpResponse.data.message, { variant: "success" });
          localStorage.removeItem("nameSign");
          localStorage.removeItem("emailSign");
          localStorage.removeItem("passSign");
          navigate("/sign-in");
        } else {
          enqueueSnackbar(signUpResponse.data.message, { variant: "warning" });
        }
      } else {
        enqueueSnackbar(authResponse.data.message, { variant: "warning" });
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
    <main className="w-full h-[100vh] flex items-center justify-center p-6">
      <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Verify Email?
            </h1>
            <p className="text-blue-600 decoration-2 hover:underline font-medium">
              A verification code has been sent to your email
            </p>
          </div>

          <div className="mt-5">
            <div>
              <div className="grid gap-y-4">
                <div>
                  <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                    Code here!
                  </label>
                  <div className="relative">
                    <input
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter your code"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAuth}
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthEmail;
