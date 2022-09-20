import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="col col-12 p-5 pb-3 footer">
      <div className=" row col-12">
        <div className=" col-12 col-sm-4  ">
          <span className="text-white" style={{ fontWeight: "bold" }}>
            Quick Links
          </span>
          <ul className=" list-unstyled d-flex flex-column col-12 justify-content-start align-items-start mb-0  ">
            <li className=" me-2">
              <Link to="/">Home</Link>
            </li>
            <li className=" me-2">
              <Link to="/main/my-profile">Articles</Link>
            </li>
            <li className=" me-2">
              <Link to="/main/my-profile">Contributors</Link>
            </li>
          </ul>
        </div>
        <div className=" col-12 col-sm-4  ">
          <span className="text-white" style={{ fontWeight: "bold" }}>
            About this project
          </span>
          <p>
            <i className="text-white">
              This is a project built over 2 months or so, by Gavin D'mello for
              his Masters project coursework
            </i>
          </p>
        </div>
        <div className=" col-12 col-sm-4  d-flex flex-column  mt-sm-0">
          <span
            className="text-white text-center col-12"
            style={{ fontWeight: "bold" }}
          >
            Share with friends
          </span>
          <div className="col-12 d-flex flex-row justify-content-center mt-2">
            <a
              className=" me-1 btn btn-social-icon btn-facebook"
              href="http://www.facebook.com/profile.php?id="
            >
              <i className=" fa fa-facebook"></i>
            </a>
            <a
              className=" me-1 btn btn-social-icon btn-linkedin"
              href="http://www.linkedin.com/in/"
            >
              <i className=" fa fa-linkedin"></i>
            </a>
            <a
              className=" me-1 btn btn-social-icon btn-twitter"
              href="http://twitter.com/"
            >
              <i className=" fa fa-twitter"></i>
            </a>

            <a
              className=" me-1 btn btn-social-icon btn-instagram"
              href="mailto:"
            >
              <i className=" fa fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className=" col-12 mt-5 align-items-center justify-content-around">
        <p className=" mb-0 " style={{ color: "#ddd", textAlign: "center" }}>
          © Copyright 2022 Blogica
        </p>
      </div>
    </div>
  );
};

export default Footer;
