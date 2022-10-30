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
import { Author, Person } from "../../../config/types";
import ContributorListCard from "./ContributorListCard";
import apis from "../../../config/api";
// const contributorsDataset: Person[] = [
//   {
//     _id: 21,
//     username: "gavin10",
//     firstname: "Robert",
//     lastname: "Danny Jr.",
//     createdAt: "",
//     bio:
//       "Robert Danny Jr. is a content creator currently building an app called Blogica for his Masters degree",
//     image_url:
//       "https://wellgroomedgentleman.com/media/images/Tony_Stark_Beard_with_Quiff_Hairstyle.width-800.jpg",
//   },
//   {
//     _id: 22,
//     username: "gavin10",
//     firstname: "Mike",
//     lastname: "Ross",
//     createdAt: "",
//     bio:
//       "Mike Ross is a content creator currently building an app called Blogica for his Masters degree",
//     image_url:
//       "https://www.tvinsider.com/wp-content/uploads/2019/07/Suits-Mike-1014x570.jpg",
//   },
//   {
//     _id: 23,
//     username: "gavin10",
//     firstname: "Harvey",
//     lastname: "Spectre",
//     createdAt: "",
//     bio:
//       "Harvey Spectre is a content creator currently building an app called Blogica for his Masters degree",
//     image_url:
//       "https://i.pinimg.com/474x/3f/d1/b8/3fd1b807b8425cb3f328fa06e5dcd63b--gabriel-macht-harvey-specter.jpg",
//   },
//   {
//     _id: 24,
//     username: "gavin10",
//     firstname: "Gavin",
//     lastname: "D'mello",
//     createdAt: "",
//     bio:
//       "Gavin D'mello is a content creator currently building an app called Blogica for his Masters degree",
//     image_url: "https://avatars.githubusercontent.com/u/54526769?v=4",
//   },
//   {
//     _id: 25,
//     username: "gavin10",
//     firstname: "Robert",
//     lastname: "Danny Jr.",
//     createdAt: "",
//     bio:
//       "Robert Danny Jr. is a content creator currently building an app called Blogica for his Masters degree",
//     image_url:
//       "https://wellgroomedgentleman.com/media/images/Tony_Stark_Beard_with_Quiff_Hairstyle.width-800.jpg",
//   },
//   {
//     _id: 26,
//     username: "gavin10",
//     firstname: "Mike",
//     lastname: "Ross",
//     createdAt: "",
//     bio:
//       "Mike Ross is a content creator currently building an app called Blogica for his Masters degree",
//     image_url:
//       "https://www.tvinsider.com/wp-content/uploads/2019/07/Suits-Mike-1014x570.jpg",
//   },
//   {
//     _id: 27,
//     username: "gavin10",
//     firstname: "Harvey",
//     lastname: "Spectre",
//     createdAt: "",
//     bio:
//       "Harvey Spectre is a content creator currently building an app called Blogica for his Masters degree",
//     image_url:
//       "https://i.pinimg.com/474x/3f/d1/b8/3fd1b807b8425cb3f328fa06e5dcd63b--gabriel-macht-harvey-specter.jpg",
//   },
//   {
//     _id: 28,
//     username: "gavin10",
//     firstname: "Gavin",
//     lastname: "D'mello",
//     createdAt: "",
//     bio:
//       "Gavin D'mello is a content creator currently building an app called Blogica for his Masters degree",
//     image_url: "https://avatars.githubusercontent.com/u/54526769?v=4",
//   },
// ];

const Contributors = (props: any) => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const locationParams = useLocation();
  // state hooks
  const [search, updateSearch] = useState("");
  const [contributors, updateContributors] = useState<null | Author[]>(null);
  const [offset, updateOffset] = useState(0);
  const [loading, updateLoading] = useState(false);
  const [error, updateError] = useState(null);
  const [listCount, updateListCount] = useState(0);
  const [callerCounter, updateCallerCounter] = useState(0);

  // redux state
  const state = useSelector((state: any) => {
    // eslint-disable-next-line no-labels, no-label-var
    return { userState: state.userActionReducer };
  });
  const { user } = state.userState;

  // useEffects
  useEffect(() => {
    getContributorsFromApi();
  }, [callerCounter]);

  // functions/callbacks
  const searchUpdateCallback = async (value: string) => {
    console.log("VALUE, callback");
    updateOffset(0);
    updateContributors(null);
    updateLoading(true);
    await updateSearch(value);
    await updateCallerCounter(callerCounter + 1);
  };

  const getContributorsFromApi = () => {
    updateLoading(true);

    apis
      .getAllAuthors({
        search,
        limit: 9,
        offset,
      })
      .then(async ({ data }) => {
        var authors = data.results;

        updateListCount(data.count);
        updateOffset(data.nextOffset);

        if (contributors) {
          updateContributors([...contributors, ...authors]);
        } else {
          updateContributors([...authors]);
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
  const loadContributors = (contributorList: Person[]) => {
    return contributorList.map((contributor: Person, index: number) => (
      <div key={index} className={`col-12 col-sm-6 col-lg-3 mb-5  px-4`}>
        <ContributorListCard contributor={contributor} index={index} />
      </div>
    ));
  };

  // main render
  return (
    <div className="col-12 d-flex flex-column  flex-grow-1">
      {/* Searchbar */}
      <div className="d-flex col-12 flex-row justify-content-center container mt-4 px-0 ">
        <div className="col-12 col-md-8  p-4 " style={{}}>
          <Generic.SearchBar
            searchFor="contributors"
            apiCallback={(val: any) => searchUpdateCallback(val)}
          />
        </div>
      </div>
      {/* List */}

      {loading && <Generic.Loader message="Loading" />}
      {!loading && contributors && (
        <div className="noselect  col-12   pt-1">
          <div className="container p-0">
            <div className="d-flex flex-column align-items-end pt-3 pe-4">
              <em
                className="px-2 pt-1"
                style={{
                  border: "0.5px solid #ddd",
                  backgroundColor: "#eee",
                  borderRadius: 3,
                }}
              >
                Showing: {contributors.length} of {listCount} contributors
              </em>
            </div>
            <InfiniteScroll
              className="pt-4"
              dataLength={contributors ? contributors.length : 0} //This is important field to render the next data
              next={() => {
                getContributorsFromApi();
              }}
              hasMore={listCount > contributors.length}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
              loader={<h4 className="col-12 text-center">Fetching more...</h4>}
              endMessage={
                <p className="col-12" style={{ textAlign: "center" }}>
                  <b>
                    {contributors.length === 0
                      ? search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "").length >
                        2
                        ? "No match found! Please try a different search"
                        : "There are no contributors to our website yet."
                      : "Yay! You have seen it all"}
                  </b>
                </p>
              }
            >
              {contributors && loadContributors(contributors)}
            </InfiniteScroll>
          </div>
        </div>
      )}
      {!loading && error && <Generic.ListError error={error} />}
    </div>
  );
};

export default Contributors;
