import { Routes, Route } from "react-router-dom";
import { useReducer, createContext, useEffect } from "react";
import { initialState, reducer } from "./store.js";
import Home from "./pages/Home/Home.jsx";
import Navbar from "./components/LayOut/Navbar.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import AuthEmail from "./pages/Auth/AuthEmail.jsx";
import { useSnackbar } from "notistack"; // Import hook từ Notistack
import ListRoom from "./pages/Room/ListRoom.jsx";
import CreateRoom from "./pages/Room/CreateRoom.jsx";
import FlashCardApp from "./pages/FlashCard/FlashCard.jsx";
import FlashCardTopics from "./pages/FlashCard/FlashCardTopic.jsx";

export const AppContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (
      localStorage.getItem("Fullname") &&
      localStorage.getItem("Email") &&
      localStorage.getItem("Avatar") &&
      localStorage.getItem("AccessToken") &&
      localStorage.getItem("Id")
    ) {
      dispatch({
        type: "USER_LOGIN",
        payload: {
          name: localStorage.getItem("Fullname"),
          email: localStorage.getItem("Email"),
          avatar: localStorage.getItem("Avatar"),
          accessToken: localStorage.getItem("AccessToken"),
          id: localStorage.getItem("Id"),
        },
      });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {!state.loading ? (
        <>
          <div className="h-20 w-full z-50 fixed top-0">
            {state.navbar && <Navbar />}
          </div>
          <div className="min-h-screen w-full z-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/auth-code" element={<AuthEmail />} />
              <Route path="/list-room" element={<ListRoom />} />
              <Route path="/create-room" element={<CreateRoom />} />
              <Route path="/flash-card-topic" element={<FlashCardTopics />} />
              <Route path="/flash-card/:idTopic" element={<FlashCardApp />} />
            </Routes>
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
        </div>
      )}
    </AppContext.Provider>
  );
};

export default App;
