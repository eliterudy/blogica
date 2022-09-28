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

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";
import { Article, AuthorDetail, User } from "../../../config/types";
import { icons, constants } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import ArticleListCard from "../../../components/ArticleListCard";
import moment from "moment";
import ArticleListingByCategory from "./ArticleListingByCategory";
import NewArticleCard from "./NewArticleCard";

const tabs = ["My Articles", "Recently Viewed Articles"];
const dict: { [key: string]: string[] } = {
  "My Articles": [constants.MY_ARTICLES, "published"],
  "Recently Viewed Articles": [constants.RECENTLY_VIEWED_ARTICLES, "recents"],
};

const Feeds = (props: any) => {
  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const state = useSelector((state: any) => {
    return {
      // userState: state.userActionReducer,
      userState: state.userActionReducer,
    };
  });
  const { user } = state.userState;

  const [activeTab, updateActiveTab] = useState(0);

  // useEffect(() => {
  //   if (!user) navigate("/main/home");
  // }, []);

  return (
    <div>
      {user ? (
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
                          fullname="Gavin D'mello"
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
                          Joined in {moment(user.created).format("MMM, YYYY")}
                        </span>
                      </Col>
                      {/* For v2 */}
                      {/* <Button
                  className="col-12 mb-5"
                  {...editProfileButtonStyle}
                  outline>
                  Edit Profile
                </Button> */}
                      {/* <Col className="col-12 ">
                  {!user.isVerified && (
                    <div className="py-4" {...verifyCardHoverStyle}>
                      <p style={{color: '#ECDBBA', marginBottom: 20}}>
                        If you love cooking like we do and wish to contribute to
                        our website with you marvelous recipes, click on the
                        link below to become a verified contributor
                      </p>
                      <Button
                        {...getVerifiedButtonStyle}
                        className="col-12 "
                        onClick={() => {
                          apis
                            .postVerifyUser({})
                            .then(({data}) => {
                              dispatch(verifyUser(true));
                              // updateActiveTab(0);
                            })
                            .catch(err => {
                              if (
                                err &&
                                err.message &&
                                err.message === 'Network Error'
                              ) {
                                if (navigator.onLine) {
            navigate('/server-down', {
              state: {redirectPath: '/main/my-profile/'},
            });
          } else {
            alert(
              'This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again',
            );
          }
                              } else {
                                alert('Oops! Something went wrong');
                              }
                            });
                        }}>
                        <span>Get Verified</span>
                      </Button>
                    </div>
                  )}
                </Col> */}
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
                          flexDirection: "row",
                          overflowX: "auto",
                          overflowY: "hidden",
                          flexWrap: "nowrap",
                        }}
                      >
                        {tabs &&
                          tabs.map((tab, index) => {
                            if (tab === "My Recipes" && !user.isVerified) {
                              return null;
                            }
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
                                  <span className="px-3">{tab}</span>
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
                              category={tab}
                              tabMessage={dict[tab][0].toString()}
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
