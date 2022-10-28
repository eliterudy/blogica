/* package inports */

import React, { useState, useRef, useEffect, LegacyRef } from "react";
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
import moment from "moment";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";
import {
  Article,
  PublishedDetails,
  User,
  UserDetails,
  UserDetailSegment,
} from "../../../config/types";
import { icons, constants } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import ArticleListCard from "../../../components/ArticleListCard";
import ArticleListingByCategory from "./ArticleListingByCategory";
import NewArticleCard from "./NewArticleCard";
import apis from "../../../config/api";

const tabs = [
  { key: "published", title: "My Articles", message: constants.MY_ARTICLES },
  {
    key: "recents",
    title: "Recently Viewed Articles",
    message: constants.RECENTLY_VIEWED_ARTICLES,
  },
  { key: "saved", title: "Saved Articles", message: constants.MY_ARTICLES },
];

const Feeds = (props: any) => {
  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const state = useSelector((state: any) => {
    return {
      userState: state.userActionReducer,
    };
  });

  const [activeTab, updateActiveTab] = useState(0);
  const [user, updateUser] = useState<UserDetails | null>(null);
  const [isLoading, updateLoading] = useState(false);
  const [error, updateError] = useState("");
  useEffect(() => {
    updateLoading(true);
    apis
      .getUserDetails({ isProfile: true })
      .then(({ data }) => {
        console.log("data", data);
        updateUser(data);
        updateLoading(false);
      })
      .catch((err) => {
        updateError(err.message.toString());
        console.log(err);
        if (err.response.status == "401") navigate("/main/home");
        updateLoading(false);
      });
  }, []);
  return (
    <div>
      {isLoading && <div className="vh-100 vw-100"></div>}
      {!isLoading && user ? (
        <div className="col-12 d-flex flex-column  flex-grow-1">
          <div className="">
            <div className="col-12">
              <div>
                <div className="noselect row col-12 m-0">
                  {/* Left section */}
                  <div className="noselect  col-12 col-md-4 col-xl-3 border-end  px-4 bg-white  ">
                    <div className="sticky-top" style={{ marginBottom: 50 }}>
                      <div className="d-flex flex-column align-items-center pt-5 ">
                        <Generic.Avatar
                          image_url={user.image_url}
                          fullname={user.firstname + user.lastname}
                          size={150}
                        />
                        <h4
                          style={{
                            padding: 10,
                            overflowWrap: "break-word",
                          }}
                        >{`${user.firstname} ${user.lastname}`}</h4>
                      </div>

                      <Col className="mt-2 ">
                        <em>{user.bio} </em>
                      </Col>
                      <Col className="mt-4">
                        <i
                          className="fa fa-file-text-o fa-lg me-2 "
                          aria-hidden="true"
                        ></i>

                        <span>
                          {user.published.articles.length} Published Articles
                        </span>
                      </Col>
                      <Col className="mt-2">
                        <i
                          className="fa fa-desktop fa-lg me-2 "
                          aria-hidden="true"
                        ></i>

                        <span>
                          Joined in {moment(user.createdAt).format("MMM, YYYY")}
                        </span>
                      </Col>
                    </div>
                  </div>

                  {/* Right section */}
                  <div className="noselect d-flex flex-column flex-grow-1 col-12 col-md-8 col-xl-9 px-2 ">
                    <NewArticleCard />
                    <div className="d-flex flex-row align-items-center">
                      {/* <i
                          className="fa fa-arrow-circle-left fa-lg"
                          onClick={() => {
                            if (scrollElement && scrollElement.current) {
                              console.log(scrollElement.current);
                              // scrollElement.current.scroll = 50;
                            }
                          }}
                        ></i> */}

                      <Nav
                        id="feedtabs"
                        tabs
                        className="m-2 "
                        style={{
                          display: "flex",
                          flex: 1,
                          flexDirection: "row",
                          overflowX: "auto",
                          overflowY: "hidden",
                          flexWrap: "nowrap",
                        }}
                      >
                        {tabs &&
                          tabs.map((tab, index) => {
                            return (
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: activeTab === index,
                                  })}
                                  onClick={() => {
                                    console.log("ClICKERD", index);
                                    updateActiveTab(index);
                                  }}
                                  style={{
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <span className="px-3">{tab.title}</span>
                                </NavLink>
                              </NavItem>
                            );
                          })}
                      </Nav>
                      {/* <div></div> */}
                    </div>
                    <TabContent activeTab={activeTab} className="m-2 ">
                      {tabs.map((tab, index) => {
                        return (
                          <TabPane tabId={index} className="flex-grow-1">
                            <ArticleListingByCategory
                              index={index}
                              data={
                                user[tab.key as keyof UserDetailSegment][
                                  "articles"
                                ]
                              }
                              tabMessage={tab.message}
                            />
                          </TabPane>
                        );
                      })}
                    </TabContent>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Feeds;
