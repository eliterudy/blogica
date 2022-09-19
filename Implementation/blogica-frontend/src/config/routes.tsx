/* package inports */
import React, { useState, useRef, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

/* component/ inports */
import Header from "../components/Header";
import {
  Home,
  Feeds,
  SignIn,
  SignUp,
  ContributorList,
  ArticleList,
  ArticleDetail,
  AuthorProfile,
  NotFound,
} from "../screens/index";
import ScrollToTop from "../components/generic/scrollToTop";

/* helper imports */
import reduxApiCallers from "../redux/thunks/reduxApiCallers";
import actions from "../redux/actionReducers/index";

const MainRouter = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const MainRoutes = () => {
    console.log("here");
    const [isModalOpen, updateModalOpen] = useState(false);
    const toggleModal = () => {
      updateModalOpen(!isModalOpen);
    };

    const state = useSelector((state: any) => {
      // eslint-disable-next-line no-labels, no-label-var
      return { user: false };
    });
    const { user } = state;

    // useEffect(() => {
    //   var userToken = localStorage.getItem("token");
    //   if (user) {
    //     navigate("/main/feeds");
    //   } else {
    //     navigate("/main/home");
    //   }
    // }, [location.pathname, user]);

    return (
      <div className="vh-100 d-flex flex-column">
        <Header modalCallback={() => toggleModal()} />
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to={user ? "/main/feeds" : "/main/home"} replace />
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/feeds" element={<Feeds />} />
          <Route path="/contributors" element={<ContributorList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route
            path="/articleId/:articleId"
            element={
              <ScrollToTop>
                <ArticleDetail />
              </ScrollToTop>
            }
          />
          <Route
            path="/authorId/:authorId"
            element={
              <ScrollToTop>
                <AuthorProfile />
              </ScrollToTop>
            }
          />
          {/* default route */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </div>
    );
  };

  const AuthRoutes = () => {
    return (
      <div>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* default route */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </div>
    );
  };

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route path={"main/*"} element={<MainRoutes />} />
        <Route path={"auth/*"} element={<AuthRoutes />} />
        <Route path={"not-found"} element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
