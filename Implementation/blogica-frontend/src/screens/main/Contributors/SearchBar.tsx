/* package inports */

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";
import { DebounceInput } from "react-debounce-input";
import { InputGroup, Button } from "reactstrap";
/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";

import { icons } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";

const SearchBar = (props: any) => {
  const { apiCallback } = props;
  const [search, updateSearch] = useState("");
  return (
    <div className="d-flex col-12 flex-row justify-content-center container">
      <div className="col-12 col-md-8  p-4 " style={{}}>
        <InputGroup className="col-12 border-bottom border-bottom-4 border-dark ps-2 pb-1 align-items-center">
          <img
            className="noselect col-auto me-3"
            src={icons.search_black}
            height={20}
            width={20}
            alt="Search"
          />
          <DebounceInput
            className="d-flex flex-grow-1 border-0"
            minLength={2}
            debounceTimeout={300}
            style={{ outline: "none" }}
            placeholder="Search contributors..."
            onChange={async (e: any) => {
              updateSearch(e.target.value);
              apiCallback(e.target.value);
            }}
          />

          {/* <InputGroupText></InputGroupText> */}
        </InputGroup>
      </div>
    </div>
  );
};

export default SearchBar;
