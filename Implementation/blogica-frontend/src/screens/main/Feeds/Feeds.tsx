/* package inports */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Nav, NavItem, NavLink, TabContent, TabPane, Col } from "reactstrap";
import classnames from "classnames";
import moment from "moment";

/* component/screen inports */

/* helper imports */
import {
  Article,
  UserDetailArticleSegment,
  UserDetails,
} from "../../../config/types";
import { icons, constants } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { numberToCurrencyRounder } from "../../../utils/generic";
import ArticleListingByCategory from "./ArticleListingByCategory";
import NewArticleCard from "./NewArticleCard";
import apis from "../../../config/api";
import Achievements from "../../../components/generic/Achievements";

const tabs = [
  {
    key: "published",
    title: "My Published Articles",
    message: constants.TAB_MESSAGE_PUBLISHED_ARTICLES,
  },
  {
    key: "drafts",
    title: "My Article Drafts",
    message: constants.TAB_MESSAGE_ARTICLES_DRAFTS,
  },

  {
    key: "recents",
    title: "Recently Viewed Articles",
    message: constants.TAB_MESSAGE_RECENTLY_VIEWED_ARTICLES,
  },
  {
    key: "saved",
    title: "Saved Articles",
    message: constants.TAB_MESSAGE_SAVED_ARTICLES,
  },
];

const Feeds = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  var selectedFeedsTab = window.sessionStorage.getItem("feedsTab");

  const [activeTab, updateActiveTab] = useState(
    selectedFeedsTab ? JSON.parse(selectedFeedsTab).activeTab : 0
  );
  const [userData, updateUser] = useState<UserDetails | null>(null);
  const [isLoading, updateLoading] = useState(false);
  const [error, updateError] = useState("");

  useEffect(() => {
    document.title = "My Feeds";
  }, []);

  useEffect(() => {
    if (location && location.state) {
      const { tab } = location.state as any;
      updateActiveTab(tab);
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
    <div>
      {isLoading && <div className=" noselect vh-100 vw-100"></div>}
      {!isLoading && userData ? (
        <div className=" noselect col-12 d-flex flex-column  flex-grow-1">
          <div className=" noselect col-12 ">
            <div className=" noselect     row col-12 m-0">
              {/* Left section */}
              <div className=" noselect col-12 col-md-4 col-xl-3 border-end  px-4 px-md-4  bg-white  ">
                <div
                  className=" noselect sticky-top pt-2"
                  style={{ marginBottom: 20 }}
                >
                  <div className=" noselect d-flex justify-content-end mt-2 mb-3">
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
                          userData.points_earned - userData.points_spent
                        )}{" "}
                        points
                      </span>
                    </div>
                  </div>
                  <div className=" noselect d-flex flex-column align-items-center  ">
                    <Generic.Avatar
                      image_url={userData.image_url}
                      fullname={userData.firstname + userData.lastname}
                      size={200}
                    />
                    <h4
                      style={{
                        paddingTop: 10,
                        overflowWrap: "break-word",
                        margin: 0,
                      }}
                    >{`${userData.firstname} ${userData.lastname}`}</h4>
                    <span
                      style={{
                        paddingBottom: 10,
                        overflowWrap: "break-word",
                        color: "#777",
                      }}
                    >{` @${userData.username}`}</span>
                  </div>
                  <div className=" noselect ">
                    <Col className=" noselect my-3  text-justify">
                      <p
                        className=" noselect text-justify"
                        style={{ textAlign: "justify", fontSize: 14 }}
                      >
                        <em>{userData.bio}</em>
                      </p>
                    </Col>
                    <Col className=" noselect border-top py-3">
                      <Col className=" noselect mt-1">
                        <i
                          className=" noselect fa fa-file-text-o fa-lg me-2 "
                          aria-hidden="true"
                        ></i>

                        <span>
                          {userData.articles.published.length} Published
                          Articles
                        </span>
                      </Col>
                      <Col className=" noselect mt-1">
                        <i
                          className=" noselect fa fa-desktop fa-lg me-2 "
                          aria-hidden="true"
                        ></i>

                        <span>
                          Joined in{" "}
                          {moment(userData.createdAt).format("MMM, YYYY")}
                        </span>
                      </Col>
                    </Col>
                    {userData &&
                      userData.badges &&
                      userData.badges.length > 0 && (
                        <Achievements badges={userData.badges} />
                      )}
                  </div>
                </div>
              </div>

              {/* Right section */}
              <div className=" noselect     d-flex flex-column flex-grow-1 col-12 col-md-8 col-xl-9 px-4 ">
                <NewArticleCard />
                <div className=" noselect d-flex flex-row align-items-center mx-2">
                  {/* Left arrow for navtab */}
                  {/* <div
                        className=" noselect d-block  d-lg-none bg-primary text-white px-3 py-2"
                        style={{
                          borderTopLeftRadius: 5,
                          borderBottomLeftRadius: 5,
                        }}
                      >
                        <b>{"◀️"}</b>
                      </div> */}

                  <Nav
                    id="feedtabs"
                    tabs
                    className=" noselect my-2"
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
                                window.sessionStorage.setItem(
                                  "feedsTab",
                                  JSON.stringify({ activeTab: index })
                                );
                              }}
                              style={{
                                whiteSpace: "nowrap",
                                cursor: "pointer",
                              }}
                            >
                              <span className=" noselect px-1">
                                {tab.title}
                              </span>
                            </NavLink>
                          </NavItem>
                        );
                      })}
                  </Nav>

                  {/* Right arrow for navtab */}
                  {/* <div
                        className=" noselect d-block  d-lg-none bg-primary text-white px-3 py-2"
                        style={{
                          borderTopRightRadius: 5,
                          borderBottomRightRadius: 5,
                        }}
                      >
                        <b>{"▶️"}</b>
                      </div> */}
                </div>
                <TabContent activeTab={activeTab} className=" noselect my-2 ">
                  {tabs.map((tab, index) => {
                    return (
                      <TabPane
                        key={index}
                        tabId={index}
                        className=" noselect flex-grow-1"
                      >
                        <ArticleListingByCategory
                          index={index}
                          data={
                            userData["articles"][
                              tab.key as keyof UserDetailArticleSegment
                            ]
                          }
                          tabMessage={tab.message}
                          deleteCallback={(
                            index: number,
                            articleCategoryProps: string
                          ) => {
                            var articleCategory =
                              userData.articles[
                                articleCategoryProps as keyof UserDetailArticleSegment
                              ];
                            articleCategory.splice(index, 1);
                            var userDetails = userData;
                            userDetails.articles[
                              articleCategoryProps as keyof UserDetailArticleSegment
                            ] = articleCategory;
                            updateUser({ ...userDetails });
                          }}
                          addCallback={(
                            article: Article,
                            articleCategoryProps: string
                          ) => {
                            var articleCategory =
                              userData.articles[
                                articleCategoryProps as keyof UserDetailArticleSegment
                              ];
                            // articleCategory = [article, ...articleCategory];
                            articleCategory.unshift(article);
                            var userDetails = userData;
                            userDetails.articles[
                              articleCategoryProps as keyof UserDetailArticleSegment
                            ] = articleCategory;
                            updateUser({ ...userDetails });
                          }}
                          showAuthorDetails={
                            tab.key === "published" || tab.key === "drafts"
                              ? false
                              : true
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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Feeds;
