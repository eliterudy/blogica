/* package inports */

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Button } from "reactstrap";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";
import ReactQuill from "react-quill";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";
import actions from "../../../redux/actionReducers/index";
import moment from "moment";

const ArticleBody = ({ article }: any) => {
  return (
    <div className="col-12 ">
      <span className="col-12 h1 fw-bold">{article.title}</span>
      <div
        className="img-fluid my-4"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_API_URL +
            article.image_url})`,
          aspectRatio: "4/3",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <ReactQuill
        readOnly={true}
        className="p-0 col-12 pb-4 "
        style={{ flex: 1, backgroundColor: "#fff" }}
        theme="bubble"
        value={article.description}
      />
    </div>
  );
};

export default ArticleBody;
