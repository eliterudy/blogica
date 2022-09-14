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

/* component/screen inports */
import Header from "../components/Header";
import {
  Home as HomeScreen,
  SignIn as SignInScreen,
  SignUp as SignUpScreen,
  ContributorList as ContributorListScreen,
  ArticleList as ArticleListScreen,
  ArticleDetail as ArticleDetailScreen,
  AuthorProfile as AuthorProfileScreen,
  NotFound as NotFoundScreen,
} from "../screens/index";
import ScrollToTop from "../components/generic/scrollToTop";

/* helper imports */
import reduxApiCallers from "../redux/thunks/reduxApiCallers";
import actions from "../redux/actionReducers/index";

const MainRouter = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const HomeRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/articleId/:articleId"
          element={
            <ScrollToTop>
              <ArticleDetailScreen />
            </ScrollToTop>
          }
        />
        <Route
          path="/authorId/:authorId"
          element={
            <ScrollToTop>
              <AuthorProfileScreen />
            </ScrollToTop>
          }
        />

        {/* default route */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    );
  };

  const ContributorRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<ContributorListScreen />} />
        <Route
          path="/authorId/:authorId"
          element={
            <ScrollToTop>
              <AuthorProfileScreen />
            </ScrollToTop>
          }
        />
        <Route
          path="/articleId/:articleId"
          element={
            <ScrollToTop>
              <ArticleDetailScreen />
            </ScrollToTop>
          }
        />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    );
  };

  const ArticleRoute = () => {
    return (
      <Routes>
        <Route path="/" element={<ContributorListScreen />} />
        <Route
          path="/authorId/:authorId"
          element={
            <ScrollToTop>
              <AuthorProfileScreen />
            </ScrollToTop>
          }
        />
        <Route
          path="/articleId/:articleId"
          element={
            <ScrollToTop>
              <ArticleDetailScreen />
            </ScrollToTop>
          }
        />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    );
  };

  const MainRoutes = () => {
    const [isModalOpen, updateModalOpen] = useState(false);
    const toggleModal = () => {
      updateModalOpen(!isModalOpen);
    };

    const state = useSelector((state: any) => {});
    // const {} = state;

    return (
      <div>
        <Header modalCallback={() => toggleModal()} />
        <Routes>
          {/* Home */}
          <Route path="home/*" element={<HomeRoutes />} />

          {/* Contributors */}
          <Route path="recipes/*" element={<ContributorRoutes />} />

          {/* My Profile */}
          {/* <Route path="my-profile/*" element={<ProfileRoute />} /> */}

          {/* Articles */}
          <Route path="articles/*" element={<ArticleRoute />} />

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
          <Route path="signin" element={<SignInScreen />} />
          <Route path="signup" element={<SignUpScreen />} />
          {/* default route */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </div>
    );
  };

  return (
    <div>
      <Routes>
        <Route path={"auth/*"} element={<AuthRoutes />} />
        <Route path={"main/*"} element={<MainRoutes />} />
        <Route path={"not-found"} element={<NotFoundScreen />} />
        <Route path="*" element={<Navigate to="/main/home" replace />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
