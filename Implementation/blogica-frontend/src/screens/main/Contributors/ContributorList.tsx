/* package inports */

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";

import { icons } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import SearchBar from "./SearchBar";

const ContributorList = (props: any) => {
  const navigate = useNavigate();
  const [loading, isLoading] = useState(true);
  const [search, updateSearch] = useState("");
  const [contributors, updateContributors] = useState([]);

  const state = useSelector((state: any) => {
    return { user: true };
  });
  const { user } = state;

  useEffect(() => {}, []);

  var searchUpdateCallback = async (value: string) => {
    console.log("here", value);
    // updateOffset(0);
    // updateRecipes(null);
    // updateRecipesLoading(true);
    await updateSearch(value);
    // await updateCallerCounter(callerCounter + 1);
  };

  return (
    <div className="col-12 d-flex flex-column  flex-grow-1">
      {/* Searchbar */}
      <SearchBar apiCallback={(val: any) => searchUpdateCallback(val)} />
      {/* List */}
      {loading && <Generic.Loader message="Loading" />}
      {!loading && contributors && (
        <div className="">
          <p>ContributorList</p>
        </div>
      )}
    </div>
  );
};

export default ContributorList;
