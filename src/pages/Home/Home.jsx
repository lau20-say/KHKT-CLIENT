import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../services/tokenService";
import Layout from "../../components/LayOutHome/Layout";
import Hero from "../../components/ComponentHome/Hero";
import Feature from "../../components/ComponentHome/Feature";
import User from "../../components/ComponentHome/Userrr";

export default function Home() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const accessToken = localStorage.getItem("AccessToken");
  const serverUri =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_PRODUCTION
      : import.meta.env.VITE_API_DEVELOPMENT;

  useEffect(() => {
    const validateToken = async () => {
      const isValid = await checkToken(accessToken, serverUri);

      if (!isValid) {
        enqueueSnackbar("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.", {
          variant: "warning",
        });
        localStorage.clear();
        navigate("/sign-in");
      } else {
        dispatch({
          type: "USER_LOGIN",
          payload: {
            name: localStorage.getItem("Fullname"),
            email: localStorage.getItem("Email"),
            avatar: localStorage.getItem("Avatar"),
            accessToken: accessToken,
            id: localStorage.getItem("Id"),
          },
        });
      }
    };

    validateToken();

    dispatch({ type: "SET_OPEN_NAV", payload: { navbar: false } });

    return () => {
      dispatch({ type: "SET_OPEN_NAV", payload: { navbar: true } });
    };
  }, [accessToken, serverUri, dispatch, navigate, enqueueSnackbar]);

  return (
    <Layout>
      <Hero />
      <Feature />
      <User />
    </Layout>
  );
}
