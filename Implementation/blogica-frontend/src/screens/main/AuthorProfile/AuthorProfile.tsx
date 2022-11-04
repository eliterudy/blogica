/* package inports */

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Col } from "reactstrap";
import { useMediaQuery } from "react-responsive";
import moment from "moment";

/* component/screen inports */

/* helper imports */
import { Article, AuthorDetails } from "../../../config/types";
import { constants, icons } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import ArticleListCard from "../../../components/ArticleListCard";
import apis from "../../../config/api";
import Achievements from "../../../components/generic/Achievements";

const AuthorProfile = (props: any) => {
  const location = useLocation();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [author, updateAuthorDetails] = useState<null | AuthorDetails>(null);
  const [loading, updateLoading] = useState(false);
  const [error, updateError] = useState(null);

  useEffect(() => {
    document.title = "Author Profile";

    updateLoading(true);
    const locationSplit = location.pathname.split("/");
    const authorId = locationSplit[locationSplit.length - 1];
    apis
      .getAuthorDetails({ author_id: authorId })
      .then(({ data }) => {
        document.title = `${constants.APP_NAME} Author - ${data.firstname} ${data.lastname}`;
        updateAuthorDetails(data);
        updateLoading(false);
      })
      .catch(({ response, message }) => {
        if (message && message === "Network Error") {
          alert(constants.NO_INTERNET_ALERT_MESSAGE);
        } else {
          console.log(error);
          if (response && response.data && response.data.error) {
            updateError(response.data.error);
          } else {
            alert(constants.OOPS_MESSAGE);
          }
        }
        updateLoading(false);
      });
  }, []);

  var loadAuthorArticles = (articles: Article[]) => {
    var response;

    if (articles.length > 0) {
      response = (
        <div className=" noselect     col-12 d-flex flex-row flex-wrap px-4  ">
          {articles.map((article: Article, index: number) => (
            <div key={index} className={`col-12  px-2 py-4 border-bottom `}>
              <ArticleListCard
                article={article}
                index={index}
                showAuthorDetails={false}
              />
            </div>
          ))}
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
          <span className=" noselect col-12 text-center">{`The author has not written any articles yet`}</span>
        </div>
      );
    }

    return response;
  };

  return (
    <div className=" noselect col-12 d-flex flex-column  flex-grow-1">
      {loading && <Generic.Loader message="Loading" />}
      {!loading && error && <Generic.ListError error={error} />}
      {!loading && author && (
        <div className=" noselect ">
          <div className=" noselect col-12">
            <div>
              <div className=" noselect     row col-12 m-0">
                {/* Left Section */}
                <div className=" noselect col-12 col-md-4 col-xl-3 border-end  px-4 ps-md-4 pe-md-3 bg-white  ">
                  <div
                    className=" noselect sticky-top pt-2"
                    style={{ marginBottom: 20 }}
                  >
                    <div className=" noselect d-flex flex-column align-items-center  mt-4 ">
                      <Generic.Avatar
                        image_url={author.image_url}
                        fullname={author.firstname + author.lastname}
                        size={200}
                      />
                      <h4
                        style={{
                          paddingTop: 10,
                          overflowWrap: "break-word",
                          margin: 0,
                        }}
                      >{`${author.firstname} ${author.lastname}`}</h4>
                      <span
                        style={{
                          paddingBottom: 10,
                          overflowWrap: "break-word",
                          color: "#777",
                        }}
                      >{` @${author.username}`}</span>
                    </div>

                    <Col className=" noselect my-3  text-justify">
                      <p
                        className=" noselect text-justify"
                        style={{ textAlign: "justify" }}
                      >
                        <em>{author.bio}</em>
                      </p>
                    </Col>
                    <Col className=" noselect border-top py-3">
                      <Col className=" noselect mt-1">
                        <i
                          className=" noselect fa fa-file-text-o fa-lg me-2 "
                          aria-hidden="true"
                        ></i>

                        <span>
                          {author.articles.published.length} Published Articles
                        </span>
                      </Col>
                      <Col className=" noselect mt-1">
                        <i
                          className=" noselect fa fa-desktop fa-lg me-2 "
                          aria-hidden="true"
                        ></i>

                        <span>
                          Joined in{" "}
                          {moment(author.createdAt).format("MMM, YYYY")}
                        </span>
                      </Col>
                    </Col>
                    {author && author.badges && author.badges.length > 0 && (
                      <Achievements badges={author.badges} />
                    )}
                  </div>
                </div>

                {/* Right Section */}
                <div className=" noselect col-12 col-md-8 col-xl-9  p-0">
                  {author.articles && author.articles.published && (
                    <div>
                      <div className=" noselect bg-dark py-5 py-md-4 px-4 ">
                        <h1
                          className=" noselect text-white text-center"
                          style={{ fontSize: 30 }}
                        >
                          <em>
                            {`Articles by ${author.firstname} ${author.lastname} `}
                          </em>
                        </h1>
                      </div>
                      <div
                        className=" noselect col-12 pt-2 mx-0 px-0 "
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        {loadAuthorArticles(author.articles.published)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorProfile;
