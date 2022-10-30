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
import { numberToCurrencyRounder, toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import ArticleListCard from "../../../components/ArticleListCard";
import ArticleListingByCategory from "./ArticleListingByCategory";
import NewArticleCard from "./NewArticleCard";
import apis from "../../../config/api";
import Achievements from "../../../components/generic/Achievements";

const tabs = [
  { key: "published", title: "My Articles", message: constants.MY_ARTICLES },
  {
    key: "recents",
    title: "Recently Viewed Articles",
    message: constants.RECENTLY_VIEWED_ARTICLES,
  },
  { key: "saved", title: "Saved Articles", message: constants.SAVED_ARTICLES },
];

const Feeds = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const state = useSelector((state: any) => {
    return {
      userState: state.userActionReducer,
    };
  });
  var selectedFeedsTab = window.sessionStorage.getItem("feedsTab");

  const [activeTab, updateActiveTab] = useState(
    selectedFeedsTab ? JSON.parse(selectedFeedsTab).activeTab : 0
  );
  const [user, updateUser] = useState<UserDetails | null>(null);
  const [isLoading, updateLoading] = useState(false);
  const [error, updateError] = useState("");
  useEffect(() => {
    if (location && location.state) {
      const { tab } = location.state as any;
      updateActiveTab(tab);
      console.log("tab", tab);
      window.sessionStorage.setItem(
        "feedsTab",
        JSON.stringify({ activeTab: tab })
      );
    }
    updateLoading(true);
    apis
      .getUserDetails({ isProfile: true })
      .then(({ data }) => {
        updateUser(data);
        updateLoading(false);
      })
      .catch((err) => {
        updateError(err.message.toString());
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
                  <div className="noselect  col-12 col-md-4 col-xl-3 border-end  px-4 ps-md-4 pe-md-3 bg-white  ">
                    <div
                      className="sticky-top pt-2"
                      style={{ marginBottom: 20 }}
                    >
                      <div className=" d-flex justify-content-end mt-2 mb-3">
                        <div
                          style={{
                            padding: 5,
                            paddingLeft: 10,
                            paddingRight: 10,
                            backgroundColor: "#abd6a5",
                            borderRadius: 8,
                          }}
                        >
                          <img
                            src={icons.account_points}
                            style={{ width: 30 }}
                            alt={"account_points"}
                          />{" "}
                          <span style={{ fontSize: 14 }}>
                            {numberToCurrencyRounder(
                              user.points_earned - user.points_spent
                            )}{" "}
                            points
                          </span>
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center  ">
                        <Generic.Avatar
                          image_url={
                            process.env.REACT_APP_API_URL + user.image_url
                          }
                          fullname={user.firstname + user.lastname}
                          size={200}
                        />
                        <h4
                          style={{
                            paddingTop: 10,
                            overflowWrap: "break-word",
                            margin: 0,
                          }}
                        >{`${user.firstname} ${user.lastname}`}</h4>
                        <span
                          style={{
                            paddingBottom: 10,
                            overflowWrap: "break-word",
                            color: "#777",
                          }}
                        >{` @${user.username}`}</span>
                      </div>

                      <Col className="my-3 ">
                        <em>{user.bio} </em>
                      </Col>
                      <Col className="border-top py-3">
                        <Col className="mt-1">
                          <i
                            className="fa fa-file-text-o fa-lg me-2 "
                            aria-hidden="true"
                          ></i>

                          <span>
                            {user.published.articles.length} Published Articles
                          </span>
                        </Col>
                        <Col className="mt-1">
                          <i
                            className="fa fa-desktop fa-lg me-2 "
                            aria-hidden="true"
                          ></i>

                          <span>
                            Joined in{" "}
                            {moment(user.createdAt).format("MMM, YYYY")}
                          </span>
                        </Col>
                      </Col>
                      {user && user.badges && user.badges.length > 0 && (
                        <Achievements badges={user.badges} />
                      )}
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
                              <NavItem key={index}>
                                <NavLink
                                  className={classnames({
                                    active: activeTab === index,
                                  })}
                                  onClick={() => {
                                    updateActiveTab(index);
                                    console.log(index);
                                    window.sessionStorage.setItem(
                                      "feedsTab",
                                      JSON.stringify({ activeTab: index })
                                    );
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
                          <TabPane
                            key={index}
                            tabId={index}
                            className="flex-grow-1"
                          >
                            <ArticleListingByCategory
                              index={index}
                              data={
                                user[tab.key as keyof UserDetailSegment][
                                  "articles"
                                ]
                              }
                              tabMessage={tab.message}
                              showAuthorDetails={
                                tab.key === "published" ? false : true
                              }
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
