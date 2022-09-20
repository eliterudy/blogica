/* package inports */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";
import { DebounceInput } from "react-debounce-input";
import { InputGroup, Button, Row, Col } from "reactstrap";
/* component/screen inports */

/* helper imports */
import { cssHover } from "./hoverProps";
import { icons, gifs } from "../../config/configuration";
import { toggler } from "../../utils/generic";
import actions from "../../redux/actionReducers/index";
import { randomColorGenerator } from "../../utils/generic";
import Avatar from "react-avatar";

const avatarColor = randomColorGenerator();

const Generic = {
  Loader: ({ message }: { message: String }) => {
    return (
      <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
        <img src={gifs.loader} alt="loader" style={{ width: 60, height: 60 }} />
        <span>{message}</span>
      </div>
    );
  },
  Avatar: ({ imageUrl, fullname }: { imageUrl: string; fullname: string }) => {
    return <Avatar size="25" round="25px" src={imageUrl} name="Wim Mostmans" />;
  },
  SearchBar: (props: any) => {
    const { apiCallback, searchFor } = props;
    const [search, updateSearch] = useState("");
    return (
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
          placeholder={`Search ${searchFor}...`}
          onChange={async (e: any) => {
            updateSearch(e.target.value);
            apiCallback(e.target.value);
          }}
        />

        {/* <InputGroupText></InputGroupText> */}
      </InputGroup>
    );
  },
  ListError: ({ error }: any) => {
    return (
      <div
        className="container"
        style={{ height: 600, justifyContent: "center", alignItems: "center" }}
      >
        <Row className="justify-content-center">
          <p className="text-center">Error {error}</p>
        </Row>
      </div>
    );
  },
};

export default Generic;
