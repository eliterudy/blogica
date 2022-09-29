/* package inports */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import moment from "moment";

const ArticleHead = ({ article }: any) => {
  const navigate = useNavigate();
  return (
    <div className="col-12 row my-5">
      <div className="col-12 col-md-6 d-flex flex-row align-items-center">
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/main/author/id/${article.author._id}`);
          }}
        >
          <Generic.Avatar
            image_url={article.author.image_url}
            fullname="Gavin D'mello"
            size={60}
          />
        </div>
        <div className="d-flex flex-column">
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/main/author/id/${article.author._id}`);
            }}
            className=" ms-2 text-primary"
            style={{ fontWeight: "bold", fontSize: 16 }}
          >
            {article.author.fullname}
          </span>
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/main/author/id/${article.author._id}`);
            }}
            className=" ms-2 "
            style={{ fontSize: 14 }}
          >
            {`
          ${moment(article.created).format("MMM DD, YYYY")} 
          `}
          </span>
        </div>
      </div>
      <div className="col-12 pt-2 pt-md-0 col-md-6 d-flex flex-row align-items-center justify-content-start justify-content-md-end">
        <i className="fa fa-instagram fa-lg mx-2" />
        <i className="fa fa-facebook fa-lg mx-2" />
        <i className="fa fa-twitter fa-lg mx-2" />
        <i className="fa fa-envelope fa-lg mx-2" />
        <i className="fa fa-link fa-lg mx-2" />
      </div>
    </div>
  );
};

export default ArticleHead;
