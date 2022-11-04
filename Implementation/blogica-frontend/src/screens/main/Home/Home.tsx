/* package inports */

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";

import { icons, images } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import LargeArticleCard from "./LargeArticleCard";
import WideArticleCard from "./WideArticleCard";
import { constants } from "../../../config/configuration";
import { Article } from "../../../config/types";
import LargeShimmerCard from "./LargeShimmerCard";
import WideShimmerCard from "./WideShimmerCard";
import RankArticleCard from "./RankArticleCard";
import RankShimmerCard from "./RankShimmerCard";
import AboutProjectCard from "../../../components/AboutProject";
import apis from "../../../config/api";

interface filterBy {
  Top: string;
  New: string;
}

// document.title = "Home";
const Home = (props: any) => {
  const navigate = useNavigate();
  const filterBy: filterBy = {
    Top: "Trending",
    New: "Latest",
  };
  const state = useSelector((state: any) => {
    // eslint-disable-next-line no-labels, no-label-var
    return { userState: state.userActionReducer };
  });
  const { user } = state.userState;
  var selectedFeedsFilter = window.sessionStorage.getItem("homeFilter");

  const [isLoading, updateLoading] = useState(false);
  const [headerTitle, updateHeaderTitle] = useState(
    selectedFeedsFilter
      ? filterBy[JSON.parse(selectedFeedsFilter).filter as keyof filterBy]
      : "Trending"
  );
  const [articles, updateArticles] = useState<null | Article[]>(null);
  const [callerCounter, updateCallerCounter] = useState(0);
  const [selectFilter, updateSelectFilter] = useState(
    selectedFeedsFilter ? JSON.parse(selectedFeedsFilter).filter : "Top"
  );
  const refToSpecialsUsingSmoothScroll = useRef() as React.MutableRefObject<
    HTMLInputElement
  >;

  useEffect(() => {
    document.title = "Home";
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [callerCounter]);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await updateSelectFilter(e.target.value);
    await updateArticles(null);
    await updateLoading(true);
    await updateCallerCounter(callerCounter + 1);
    window.sessionStorage.setItem(
      "homeFilter",
      JSON.stringify({ filter: e.target.value.toString() })
    );
  };

  const fetchArticles = async () => {
    apis
      .getAllArticles({
        sort: selectFilter.toLowerCase(),
        limit: 20,
        offset: 0,
      })
      .then(({ data }) => {
        updateArticles(data.results);
        updateHeaderTitle(filterBy[selectFilter as keyof filterBy]);
        updateLoading(false);
      })
      .catch(({ response, message }) => {
        if (message && message === "Network Error") {
          alert(
            "This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again"
          );
        } else {
          alert(constants.OOPS_MESSAGE);
        }
        if (response.status == "401") navigate("/main/home");
        updateLoading(false);
      });
  };
  const scrollTo = (ref: any) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className=" noselect      col-12">
      <div
        id="intro"
        style={{
          backgroundImage: `url(${images.blog_background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className=" noselect      bg-image shadow-5-strong vh-100 col-12"
      >
        <div
          className=" noselect      mask vh-100 col-12"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
        >
          <div className=" noselect      container d-flex align-items-center justify-content-center text-center h-100">
            <div className=" noselect      text-white">
              <h1
                className=" noselect      mb-3"
                style={{
                  fontFamily: "Kaushan Script",
                  fontWeight: 400,
                  fontSize: "100px",
                }}
              >
                {constants.INTRO_BANNER_TITLE}
              </h1>
              <h5 className=" noselect      mb-4">
                {" "}
                {constants.INTRO_BANNER_MESSAGE}
              </h5>

              <div
                className=" noselect      btn btn-outline-light btn-lg m-2"
                onClick={() => navigate("/main/articles")}
              >
                Start Reading
              </div>
              <div
                className=" noselect      btn btn-outline-light btn-lg m-2"
                onClick={() => scrollTo(refToSpecialsUsingSmoothScroll)}
              >
                {headerTitle} Articles
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" noselect col-12 px-2 px-md-5">
        <h1
          className=" noselect      text-center pt-5 pb-2"
          style={{ fontWeight: "bold" }}
          ref={refToSpecialsUsingSmoothScroll}
        >
          {headerTitle.toUpperCase()} ARTICLES
        </h1>
        <div className=" noselect      row col-12 py-2 m-0 ">
          {/* {isLoading && <Generic.Loader message="Loading" />} */}

          <div className=" noselect col col-12  col-lg-9 p-0  ">
            <div className=" noselect row col-12  m-0">
              <div className=" noselect col-12 col-md-7 p-4 p-md-2 ">
                {articles && articles.length > 0 && !isLoading ? (
                  <LargeArticleCard
                    article={articles && articles[0]}
                    index={0}
                  />
                ) : (
                  <LargeShimmerCard />
                )}
              </div>
              <div className=" noselect col-12 col-md-5 p-4 p-md-2 px-md-3 col ">
                {articles && !isLoading
                  ? articles
                      .slice(1, 6)
                      .map((article: Article, index: number) => (
                        <div className=" noselect p-2">
                          <WideArticleCard
                            key={index}
                            article={article}
                            index={index + 1}
                          />
                        </div>
                      ))
                  : new Array(5).fill(0).map((shimmer, index) => (
                      <div className=" noselect pb-3">
                        <WideShimmerCard />
                      </div>
                    ))}
              </div>
            </div>
          </div>
          <div className=" noselect      col-12 col-md-3 px-4 py-2 d-none d-lg-flex border-start">
            <div className=" noselect col col-12">
              <h6 style={{ fontWeight: "bold" }}>FILTER ARTICLES</h6>
              <Input
                type="select"
                name="select"
                className=" noselect col-12 cursorPointer"
                style={{ padding: 10 }}
                onChange={(e) => onChange(e)}
                value={selectFilter}
              >
                <option key="top">Top</option>
                <option key="new">New</option>
              </Input>
              <p className=" noselect subMessages my-2">
                {constants.SORT_ARTICLE_NOTES}
              </p>
              {/* <Button
                size="md"
                className=" noselect w-100 bg-black"
                onClick={() => fetchArticles()}
              >
                Filter
              </Button> */}
            </div>
          </div>
        </div>
        <div className=" noselect      col col-12 border-top pt-4">
          {articles && !isLoading && articles.length > 6 && (
            <div className=" noselect d-flex flex-row ms-3">
              <i className=" noselect fa fa-cubes fa-lg me-2"></i>
              <h6 style={{ fontWeight: "bold" }}>
                MORE {headerTitle.toUpperCase()} ARTICLES
              </h6>
            </div>
          )}
          <div className=" noselect row col-12 m-0 p-4 p-md-3">
            {articles && !isLoading
              ? articles.slice(6, 13).map((article: Article, index: number) => (
                  <div className=" noselect      d-flex  col-12 col-md-6 col-lg-4">
                    <RankArticleCard
                      key={index}
                      article={article}
                      index={index}
                    />
                  </div>
                ))
              : new Array(6).fill(0).map((shimmer, index) => (
                  <div className=" noselect      d-flex  col-12 col-md-6 col-lg-4">
                    <RankShimmerCard index={index} />
                  </div>
                ))}
          </div>
          {/* For future versions */}
        </div>
      </div>
      <div
        className=" noselect      px-4 "
        style={{ backgroundColor: "#ECDBBA", borderRadius: 5 }}
      >
        <AboutProjectCard />
      </div>
    </div>
  );
};

export default Home;
