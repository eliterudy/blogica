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
import { icons } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import moment from "moment";
import ArticleHead from "./ArticleHead";
import ArticleBody from "./ArticleBody";
import { ArticleDetails } from "../../../config/types";
import apis from "../../../config/api";
import AuthorInfo from "./AuthorInfo";

const ArticleDetail = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = useSelector((state: any) => {
    return { userState: state.userActionReducer };
  });
  const { user } = state.userState;

  const [loading, updateLoading] = useState(false);
  const [article, updateArticleDetails] = useState<ArticleDetails | null>(null);
  const [error, updateError] = useState("");

  useEffect(() => {
    const locationSplit = location.pathname.split("/");
    const articleId = locationSplit[locationSplit.length - 1];

    updateLoading(true);
    apis
      .getArticle(articleId, { user_id: user ? user._id : null })
      .then(({ data }) => {
        updateArticleDetails(data);
        updateLoading(false);
      })
      .catch((err) => {
        updateError(err.message.toString());
        if (err.response.status == "401") navigate("/main/home");
        updateLoading(false);
      });
  }, []);

  return (
    <div className="col-12 d-flex flex-column  flex-grow-1 ">
      {loading && <Generic.Loader message="Loading" />}
      {!loading && article && (
        <div className="col-12">
          <div className="col-12 d-flex flex-column align-items-center ">
            <div className="col-12 col-md-8 p-4 px-md-0  ">
              <ArticleHead article={article} url={window.location.href} />
              <ArticleBody
                article={article}
                url={window.location.href}
                updateArticle={(article: ArticleDetails) =>
                  updateArticleDetails({ ...article })
                }
              />
            </div>
          </div>
          <div
            className="col-12 d-flex flex-column align-items-center "
            style={{ backgroundColor: "#eee" }}
          >
            <AuthorInfo article={article} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
