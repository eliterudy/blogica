import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { constants } from "../config/configuration";
const Footer = () => {
  const state = useSelector((state: any) => {
    return { userState: state.userActionReducer };
  });
  const { user } = state.userState;

  return (
    <div className=" noselect col col-12 p-4  pb-3 footer">
      <div className=" noselect      row col-12 px-0 px-sm-5">
        <div className=" noselect      col-12 col-md-4 pb-4  ">
          <span className=" noselect text-white" style={{ fontWeight: "bold" }}>
            Quick Links
          </span>
          <ul className=" noselect      list-unstyled d-flex flex-column col-12 justify-content-start align-items-start mb-0  ">
            <li className=" noselect      me-2">
              <Link to="/">{user ? "Feeds" : "Home"}</Link>
            </li>
            <li className=" noselect      me-2">
              <Link to="/main/articles">Articles</Link>
            </li>
            <li className=" noselect      me-2">
              <Link to="/main/contributors">Contributors</Link>
            </li>
          </ul>
        </div>
        <div className=" noselect      col-12 col-md-4 pb-4  ">
          <span className=" noselect text-white" style={{ fontWeight: "bold" }}>
            About this project
          </span>
          <p>
            <i className=" noselect text-white">
              This is a project built over 2 months or so, by Gavin D'mello for
              his Masters project coursework
            </i>
          </p>
        </div>
        <div className=" noselect      col-12 col-md-4  d-flex flex-column  mt-sm-0 pb-4">
          <span
            className=" noselect text-white text-start text-sm-end col-12"
            style={{ fontWeight: "bold" }}
          >
            Share with friends
          </span>
          <div className=" noselect col-12 d-flex flex-row justify-content-start justify-content-sm-end mt-2">
            <a
              className=" noselect      me-1 btn btn-social-icon btn-facebook"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A//blogica.netlify.app/"
            >
              <i className=" noselect      fa fa-facebook"></i>
            </a>
            <a
              className=" noselect      me-1 btn btn-social-icon btn-linkedin"
              href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A//blogica.netlify.app/"
            >
              <i className=" noselect      fa fa-linkedin"></i>
            </a>
            <a
              className=" noselect      me-1 btn btn-social-icon btn-twitter"
              href="https://twitter.com/intent/tweet?text=Come%20join%20me%20and%20read%20some%20of%20the%20amazing%20articles%20on%20Blogica%0Ahttps%3A//blogica.netlify.app/"
            >
              <i className=" noselect      fa fa-twitter"></i>
            </a>

            <a
              className=" noselect      me-1 btn btn-social-icon btn-microsoft"
              href="mailto:?body=Come%20join%20me%20and%20read%20some%20of%20the%20amazing%20articles%20on%20Blogica%0Ahttps%3A//blogica.netlify.app/"
            >
              <i className=" noselect      fa fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
      <div className=" noselect      col-12 mt-5 align-items-center justify-content-around">
        <p
          className=" noselect      mb-0 pt-5 "
          style={{ color: "#ddd", textAlign: "center" }}
        >
          © Copyright 2022 {constants.APP_NAME}
        </p>
      </div>
    </div>
  );
};

export default Footer;
