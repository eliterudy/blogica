/* package inports */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

/* component/screen inports */

/* helper imports */
import { constants } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
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
    document.title = "Article Details";

    const locationSplit = location.pathname.split("/");
    const articleId = locationSplit[locationSplit.length - 1];
    updateLoading(true);
    apis
      .getArticle(articleId, { user_id: user ? user._id : null })
      .then(({ data }) => {
        document.title = data.title;

        updateArticleDetails(data);
        updateLoading(false);
      })
      .catch(({ response, message }) => {
        if (message && message === "Network Error") {
          alert(constants.NO_INTERNET_ALERT_MESSAGE);
        } else {
          if (response && response.data && response.data.error) {
            updateError(response.data.error);
          } else {
            alert(constants.OOPS_MESSAGE);
          }
        }
        if (response.status == "401") navigate("/main/home");
        updateLoading(false);
      });
  }, []);

  return (
    <div className=" noselect col-12 d-flex flex-column  flex-grow-1 ">
      {loading && <Generic.Loader message="Loading" />}
      {!loading && article && (
        <div className=" noselect col-12">
          <div className=" noselect col-12 d-flex flex-column align-items-center ">
            <div className=" noselect col-12 col-md-8 p-4 px-md-0  ">
              <ArticleHead
                article={article}
                url={
                  "https://blogica.netlify.app/#/main/article/id/636486d6d063a2f9828939a5"
                }
              />
              <ArticleBody
                article={article}
                url={
                  "https://blogica.netlify.app/#/main/article/id/636486d6d063a2f9828939a5"
                }
                updateArticle={(article: ArticleDetails) =>
                  updateArticleDetails({ ...article })
                }
              />
            </div>
          </div>
          {article.is_published && (
            <div
              className=" noselect col-12 d-flex flex-column align-items-center "
              style={{ backgroundColor: "#eee" }}
            >
              <AuthorInfo article={article} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
