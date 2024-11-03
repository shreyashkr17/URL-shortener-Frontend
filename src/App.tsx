import { Route, Routes } from "react-router-dom";
// import Header from './Components/Header'
// import Footer from './Components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
// import { useScroll } from "framer-motion";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearToken } from "./redux/apiToken/apiToken";
import { logout } from "./redux/user/userSlice";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  // check if the user is authenticated for 24 hr long then remove the user detail from local storage and clear the redux storage
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user") ?? "";
    const inTime = localStorage.getItem("inTime") ?? "";

    if(user && inTime) {
      const currTime = new Date().getTime();
      const timeDiff = currTime - parseInt(inTime);
      if(timeDiff > 86400000) {
        localStorage.removeItem("user");
        localStorage.removeItem("inTime");

        // clear the apiToken from the redux store;
        dispatch(clearToken());
        dispatch(logout());
      }
    }
  },[]);

  useEffect(() => {
    const time = localStorage.getItem("inTime") ?? "";
    if(parseInt(time) === 0){
      localStorage.removeItem("user");
      localStorage.removeItem("inTime");
      dispatch(clearToken());
      dispatch(logout());
    }
  },[])
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* <Header /> */}
        <main className="h-full w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
      <ToastContainer/>
    </>
  );
}

export default App;
