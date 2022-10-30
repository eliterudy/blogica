/* package inports */

import React, { useState, useRef, useEffect, LegacyRef, Key } from "react";
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
  TabContent,
  TabPane,
  Col,
  Row,
} from "reactstrap";
import classnames from "classnames";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";
import InfiniteScroll from "react-infinite-scroll-component";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";
import {
  Article,
  ArticleCardProps,
  AuthorDetails,
  User,
} from "../../../config/types";
import { icons, constants } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import ArticleListCard from "../../../components/ArticleListCard";
import moment from "moment";

const ArticleListingByCategory = ({
  index,
  data,
  tabMessage,
}: {
  index: number;
  data: Article[];
  tabMessage: string;
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
          <div className="noselect  col-12  d-flex flex-row flex-wrap pt-0">
            {articles.map((article: Article, index: number) => (
              <div
                key={index}
                className={`col-12 py-4 px-2 px-0 ${
                  index == articlesCount - 1 ? "border-bottom" : "border-bottom"
                }  `}
              >
                <ArticleListCard
                  article={article}
                  index={index}
                  showAuthorDetails={showAuthorDetails}
                />
              </div>
            ))}
          </div>

          <p className="col-12 mt-4" style={{ textAlign: "center" }}>
            <em>Yay! You have seen it all</em>
          </p>
        </div>
      );
    } else {
      response = (
        <div
          className="noselect  col-12  d-flex flex-row flex-wrap pt-5 pe-3"
          style={{ marginBottom: isTabletOrMobile ? 500 : 600 }}
        >
          <span className="col-12 text-center">{`No articles`}</span>
        </div>
      );
    }

    return response;
  };
  return (
    <div
      className={`d-flex flex-column flex-grow-1 justify-content-center align-items-center`}
    >
      <span className="subMessages">{tabMessage}</span>
      {articles && (
        <div>
          <div
            className=""
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {loadArticles(articles)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleListingByCategory;
