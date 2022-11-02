/* package inports */

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";
import InfiniteScroll from "react-infinite-scroll-component";
import { Input, Button } from "reactstrap";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";
import { constants, icons } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import { ArticleFilters, Article } from "../../../config/types";
import ArticleListCard from "../../../components/ArticleListCard";
import apis from "../../../config/api";

const Articles = (props: any) => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const locationParams = useLocation();

  var selectedArticleFilter = window.sessionStorage.getItem("articleFilter");

  // state hooks
  const [search, updateSearch] = useState("");
  const [articles, updateArticles] = useState<null | Article[]>(null);
  const [offset, updateOffset] = useState(0);
  const [loading, updateLoading] = useState(false);
  const [error, updateError] = useState(null);
  const [listCount, updateListCount] = useState(0);
  const [callerCounter, updateCallerCounter] = useState(0);
  const [selectFilter, updateSelectFilter] = useState(
    selectedArticleFilter ? JSON.parse(selectedArticleFilter).filter : "Top"
  );

  // redux state
  const state = useSelector((state: any) => {
    // eslint-disable-next-line no-labels, no-label-var
    return { userState: state.userActionReducer };
  });
  const { user } = state.userState;

  // useEffects

  useEffect(() => {
    document.title =
      selectFilter && selectFilter == "Top"
        ? "Trending Articles"
        : "Latest Articles";

    getArticlesFromApi();
  }, [callerCounter]);

  // functions/callbacks
  const searchUpdateCallback = async (value: string) => {
    updateOffset(0);
    updateArticles(null);
    updateLoading(true);
    await updateSearch(value);
    await updateCallerCounter(callerCounter + 1);
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await updateSelectFilter(e.target.value);
    searchUpdateCallback(search);
    window.sessionStorage.setItem(
      "articleFilter",
      JSON.stringify({ filter: e.target.value.toString() })
    );
  };

  const getArticlesFromApi = () => {
    updateLoading(true);

    apis
      .getAllArticles({
        sort: selectFilter.toLowerCase(),
        search,
        limit: 8,
        offset,
      })
      .then(async ({ data }) => {
        var articleList = data.results;
        updateListCount(data.count);
        updateOffset(data.nextOffset);

        if (articles) {
          updateArticles([...articles, ...articleList]);
        } else {
          updateArticles([...articleList]);
        }
        updateLoading(false);
      })

      .catch((err) => {
        if (err && err.message && err.message === "Network Error") {
          alert(
            "This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again"
          );
        } else {
          updateError(err);
          updateLoading(false);
        }
      });
  };

  // component conditional render
  const loadArticles = (articles: Article[]) => {
    return (
      <div className="noselect  col-12  d-flex flex-row flex-wrap ">
        {articles.map((article: Article, index: number) => (
          <div key={index} className={`col-12 px-2 py-4 border-bottom `}>
            <ArticleListCard article={article} index={index} />
          </div>
        ))}
      </div>
    );
  };

  // main render
  var localArticles = articles;

  return (
    <div className="col-12 d-flex flex-column  flex-grow-1">
      {/* <div className="bg-dark py-3 px-2 ">
        <h1 className="text-white px-5 text-center" style={{ fontSize: 80 }}>
          <span> Articles</span>
        </h1>
      </div> */}
      {/* Searchbar */}
      <div className="d-flex col-12 flex-row justify-content-center container mt-4 p-0">
        <div className="col-12 col-md-10  p-4 " style={{}}>
          <Generic.SearchBar
            searchFor="articles"
            apiCallback={(val: any) => searchUpdateCallback(val)}
          />
        </div>
      </div>

      <div className=" row col-12 py-2 m-0 px-md-3 flex-grow-1">
        {/* Left section */}
        <div className=" col-12 col-md-3 px-4 pb-2 d-none d-md-block  ">
          <div className="col col-12 sticky-md-top mt-5">
            <h6 style={{ fontWeight: "bold" }}>SORT ARTICLES</h6>
            <Input
              type="select"
              name="select"
              className="col-12"
              style={{ padding: 10 }}
              onChange={(e) => onChange(e)}
              value={selectFilter}
            >
              <option>Top</option>
              <option>New</option>
            </Input>
            <p className="subMessages my-2">{constants.SORT_ARTICLE_NOTES} </p>
            {/* <Button
              size="md"
              className="w-100 bg-black"
              onClick={() => {
                searchUpdateCallback(search);
              }}
            >
              <b>APPLY FILTER</b>
            </Button> */}
          </div>
        </div>

        {/* Right section */}
        <div className="col col-12 col-md-9 p-0  border-start d-flex flex-column flex-grow-1">
          {loading && <Generic.Loader message="Loading Articles" />}
          {!loading && articles && (
            <div className="col-12">
              <div className="d-flex flex-column align-items-end py-2">
                <em
                  className="px-2 pt-1 mx-4"
                  style={{
                    border: "0.5px solid #ddd",
                    backgroundColor: "#eee",
                    borderRadius: 3,
                  }}
                >
                  Showing: {articles.length} of {listCount} articles
                </em>
              </div>

              <div className="col-12  ">
                {localArticles && (
                  <InfiniteScroll
                    className="px-4 "
                    dataLength={articles ? articles.length : 0} //This is important field to render the next data
                    next={() => {
                      //  getContributorsFromApi();
                    }}
                    hasMore={listCount > articles.length}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                    loader={<h4 className="col-12 text-center">Loading...</h4>}
                    endMessage={
                      <p
                        className="col-12 mt-4"
                        style={{ textAlign: "center" }}
                      >
                        <em>
                          {" "}
                          {articles.length === 0
                            ? search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "")
                                .length > 0
                              ? "No match found! Please try a different search"
                              : "No articles have emeen written yet! Hopefully someone will be writing something soon. "
                            : "Yay! You have seen it all"}
                        </em>
                      </p>
                    }
                  >
                    {loadArticles(localArticles)}
                  </InfiniteScroll>
                )}
              </div>
            </div>
          )}
          {!loading && error && <Generic.ListError error={error} />}
        </div>
      </div>
    </div>
  );
};

export default Articles;
