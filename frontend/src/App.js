import "./App.css";
import Auth from "../../frontend/src/components/Auth";
import React, { useEffect } from "react";
import Nav from "../../frontend/src/components/Navi";
import Signup from "../../frontend/src/components/Signup";
import AllBlogs from "../../frontend/src/components/AllBlogs";
import MyBlogs from "../../frontend/src/components/MyBlogs";
import { Route, Routes } from "react-router-dom";
import BlogDetail from "../../frontend/src/components/BlogDetail";
import AddBlogs from "../../frontend/src/components/AddBlogs";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

function App() {
  // .......................
  // THAPA WALY TAREKY SY B KAR SAKTY HAIN
  // .......................
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <>
      <React.Fragment>
        <header>
          <Nav />
        </header>
        <main>
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path="/signup" element={<Signup />} />
                <Route path="/auth" element={<Auth />} />
              </>
            ) : (
              <>
                <Route path="/blogs" element={<AllBlogs />} />
                <Route path="/blogs/add" element={<AddBlogs />} />
                <Route path="/myblogs" element={<MyBlogs />} />
                <Route path="/myblogs/:id" element={<BlogDetail />} />
              </>
            )}
          </Routes>
        </main>
      </React.Fragment>
    </>
  );
}

export default App;
