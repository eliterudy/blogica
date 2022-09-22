/* package inports */

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";
import InfiniteScroll from "react-infinite-scroll-component";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";
import { icons } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import { ContributorListElement } from "../../../config/types";
import ContributorListCard from "./ContributorListCard";

const contributorsDataset: ContributorListElement[] = [
  {
    _id: 21,
    firstname: "Robert",
    lastname: "Danny Jr.",
    fullname: "Robert Danny Jr.",
    bio:
      "Robert Danny Jr. is a content creator currently building an app called Blogica for his Masters degree",
    imageUrl:
      "https://wellgroomedgentleman.com/media/images/Tony_Stark_Beard_with_Quiff_Hairstyle.width-800.jpg",

    username: "tom1040",
    bookmarks: { articles: [] },
    published: { articles: [] },
    isAdmin: false,
    email: "gavin@gmail.ccom",
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 22,
    firstname: "Mike",
    lastname: "Ross",
    fullname: "Mike Ross",
    bio:
      "Mike Ross is a content creator currently building an app called Blogica for his Masters degree",
    imageUrl:
      "https://www.tvinsider.com/wp-content/uploads/2019/07/Suits-Mike-1014x570.jpg",

    username: "mike1040",
    bookmarks: { articles: [] },
    published: { articles: [] },
    isAdmin: false,
    email: "gavin@gmail.ccom",
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 23,
    firstname: "Harvey",
    lastname: "Spectre",
    fullname: "Harvey Spectre",
    bio:
      "Harvey Spectre is a content creator currently building an app called Blogica for his Masters degree",
    imageUrl:
      "https://i.pinimg.com/474x/3f/d1/b8/3fd1b807b8425cb3f328fa06e5dcd63b--gabriel-macht-harvey-specter.jpg",

    username: "harvey1040",
    bookmarks: { articles: [] },
    published: { articles: [] },
    isAdmin: false,
    email: "gavin@gmail.ccom",
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 24,
    firstname: "Gavin",
    lastname: "D'mello",
    fullname: "Gavin D'mello",
    bio:
      "Gavin D'mello is a content creator currently building an app called Blogica for his Masters degree",
    imageUrl: "https://avatars.githubusercontent.com/u/54526769?v=4",

    username: "gavin1040",
    bookmarks: { articles: [] },
    published: { articles: [] },
    isAdmin: false,
    email: "gavin@gmail.ccom",
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 25,
    firstname: "Robert",
    lastname: "Danny Jr.",
    fullname: "Robert Danny Jr.",
    bio:
      "Robert Danny Jr. is a content creator currently building an app called Blogica for his Masters degree",
    imageUrl:
      "https://wellgroomedgentleman.com/media/images/Tony_Stark_Beard_with_Quiff_Hairstyle.width-800.jpg",

    username: "tom1040",
    bookmarks: { articles: [] },
    published: { articles: [] },
    isAdmin: false,
    email: "gavin@gmail.ccom",
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 26,
    firstname: "Mike",
    lastname: "Ross",
    fullname: "Mike Ross",
    bio:
      "Mike Ross is a content creator currently building an app called Blogica for his Masters degree",
    imageUrl:
      "https://www.tvinsider.com/wp-content/uploads/2019/07/Suits-Mike-1014x570.jpg",

    username: "mike1040",
    bookmarks: { articles: [] },
    published: { articles: [] },
    isAdmin: false,
    email: "gavin@gmail.ccom",
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 27,
    firstname: "Harvey",
    lastname: "Spectre",
    fullname: "Harvey Spectre",
    bio:
      "Harvey Spectre is a content creator currently building an app called Blogica for his Masters degree",
    imageUrl:
      "https://i.pinimg.com/474x/3f/d1/b8/3fd1b807b8425cb3f328fa06e5dcd63b--gabriel-macht-harvey-specter.jpg",

    username: "harvey1040",
    bookmarks: { articles: [] },
    published: { articles: [] },
    isAdmin: false,
    email: "gavin@gmail.ccom",
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 28,
    firstname: "Gavin",
    lastname: "D'mello",
    fullname: "Gavin D'mello",
    bio:
      "Gavin D'mello is a content creator currently building an app called Blogica for his Masters degree",
    imageUrl: "https://avatars.githubusercontent.com/u/54526769?v=4",

    username: "gavin1040",
    bookmarks: { articles: [] },
    published: { articles: [] },
    isAdmin: false,
    email: "gavin@gmail.ccom",
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
];

const Contributors = (props: any) => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const locationParams = useLocation();
  // state hooks
  const [loading, isLoading] = useState(false);
  const [search, updateSearch] = useState("");
  const [contributors, updateContributors] = useState<
    null | ContributorListElement[]
  >(contributorsDataset);
  const [offset, updateOffset] = useState(0);
  const [contributorLoading, updateContributorLoading] = useState(false);
  const [contributorError, updateContributorError] = useState(null);
  const [contributorCount, updateContributorCount] = useState(0);
  const [callerCounter, updateCallerCounter] = useState(0);

  // redux state
  const state = useSelector((state: any) => {
    return { user: true };
  });
  const { user } = state;

  // useEffects
  useEffect(() => {}, []);

  // functions/callbacks
  const searchUpdateCallback = async (value: string) => {
    console.log("here", value);
    // updateOffset(0);
    // updateContributor(null);
    // updateContributorLoading(true);
    await updateSearch(value);
    // await updateCallerCounter(callerCounter + 1);
  };

  const getContributorsFromApi = () => {};

  // component conditional render
  const loadContributors = (localContributors: ContributorListElement[]) => {
    if (contributorLoading) {
      return <Generic.Loader message={"contributors"} />;
    } else if (!contributorLoading && localContributors) {
      return localContributors.map(
        (contributor: ContributorListElement, index: number) => (
          <div key={index} className={`col-12 col-sm-6 col-lg-3 mb-5 px-3 `}>
            <ContributorListCard
              contributor={contributor}
              index={index}
              redirect={`/main/contributorId/${contributor._id}`}
            />
          </div>
        )
      );
    } else {
      return <Generic.ListError error={contributorError} />;
    }
  };

  // main render
  var localContributors = contributors;

  return (
    <div className="col-12 d-flex flex-column  flex-grow-1">
      {/* Searchbar */}
      <div className="d-flex col-12 flex-row justify-content-center container mt-4 ">
        <div className="col-12 col-md-8  p-4 " style={{}}>
          <Generic.SearchBar
            searchFor="contributors"
            apiCallback={(val: any) => searchUpdateCallback(val)}
          />
        </div>
      </div>
      {/* List */}
      {loading && <Generic.Loader message="Loading" />}
      <div className="noselect  col-12   pt-1 px-3">
        {contributors && !loading && (
          <div className="container p-0">
            <div className="d-flex flex-column align-items-end pt-3">
              <em
                className="px-2 pt-1  me-3"
                style={{
                  border: "0.5px solid #ddd",
                  backgroundColor: "#eee",
                  borderRadius: 3,
                }}
              >
                Showing: {contributors.length} of {contributorCount}{" "}
                contributors
              </em>
            </div>
            <InfiniteScroll
              className="pt-4 "
              dataLength={contributors ? contributors.length : 0} //This is important field to render the next data
              next={() => {
                getContributorsFromApi();
              }}
              hasMore={contributorCount > contributors.length}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
              loader={<h4 className="col-12 text-center">Loading...</h4>}
              endMessage={
                <p className="col-12" style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {localContributors && loadContributors(localContributors)}
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contributors;
