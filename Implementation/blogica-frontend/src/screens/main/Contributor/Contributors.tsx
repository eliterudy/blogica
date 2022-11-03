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
import { icons, constants } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import { Author, Person } from "../../../config/types";
import ContributorListCard from "./ContributorListCard";
import apis from "../../../config/api";

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
    document.title = "Contributors";
  }, []);

  useEffect(() => {
    getContributorsFromApi();
  }, [callerCounter]);

  // functions/callbacks
  const searchUpdateCallback = async (value: string) => {
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
        limit: 8,
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
      });
  };

  // component conditional render
  const loadContributors = (contributorList: Person[]) => {
    return contributorList.map((contributor: Person, index: number) => (
      <div key={index} className={`col-12 col-sm-6 col-lg-3 p-3 `}>
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
            <div className="d-flex flex-column align-items-end pt-3 px-4">
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
              className="pt-4 px-2"
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
                <p className="col-12 mt-4" style={{ textAlign: "center" }}>
                  <em>
                    {contributors.length === 0
                      ? search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "").length >
                        0
                        ? constants.NO_SEARCH_RESULT_MATCH
                        : constants.NO_CONTRIBUTORS
                      : constants.SEEN_ALL}
                  </em>
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
