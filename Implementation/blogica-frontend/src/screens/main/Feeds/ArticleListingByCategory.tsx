/* package inports */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

/* component/screen inports */

/* helper imports */
import { Article } from "../../../config/types";
import { constants } from "../../../config/configuration";
import ArticleListCard from "../../../components/ArticleListCard";

const ArticleListingByCategory = ({
  data,
  tabMessage,
  showAuthorDetails,
  deleteCallback,
  addCallback,
}: {
  index: number;
  data: Article[];
  tabMessage: string;
  showAuthorDetails: boolean;
  deleteCallback: any;
  addCallback: any;
}) => {
  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [articles, updateArticles] = useState<null | Article[]>(data);
  const [articlesCount, updateArticlesCount] = useState(11);

  useEffect(() => {}, []);

  var loadArticles = (
    articles: Article[],
    showAuthorDetails: boolean = true
  ) => {
    var response;

    if (articles.length > 0) {
      response = (
        <div>
          <div className=" noselect col-12  d-flex flex-row flex-wrap">
            {articles.map((article: Article, index: number) => (
              <div
                key={index}
                className={`col-12 py-3  px-0 ${
                  index == articlesCount - 1 ? "border-bottom" : "border-bottom"
                }  `}
              >
                <ArticleListCard
                  article={article}
                  index={index}
                  showAuthorDetails={showAuthorDetails}
                  deleteCallback={(index: number, articleCategory: string) =>
                    deleteCallback(index, articleCategory)
                  }
                  addCallback={(article: Article, articleCategory: string) =>
                    addCallback(article, articleCategory)
                  }
                />
              </div>
            ))}
          </div>

          <p className=" noselect col-12 mt-4" style={{ textAlign: "center" }}>
            <em>Yay! You have seen it all</em>
          </p>
        </div>
      );
    } else {
      response = (
        <div
          className=" noselect col-12  d-flex flex-row flex-wrap pt-5 pe-3"
          style={{ marginBottom: isTabletOrMobile ? 500 : 600 }}
        >
          <p className=" noselect col-12 text-center">
            <em>{constants.NO_ARTICLES_UNDER_TAB}</em>
          </p>
        </div>
      );
    }

    return response;
  };
  return (
    <div
      className={`d-flex flex-column flex-grow-1 justify-content-center align-items-center`}
    >
      <span className=" noselect subMessages">{tabMessage}</span>
      {articles && (
        <div className=" noselect col-12" style={{}}>
          {loadArticles(articles, showAuthorDetails)}
        </div>
      )}
    </div>
  );
};

export default ArticleListingByCategory;
