/* package inports */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";
import { DebounceInput } from "react-debounce-input";
import { InputGroup, Button, Row, Col, Tooltip } from "reactstrap";
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
      <div className=" d-flex flex-grow-1 flex-column justify-content-center align-items-center">
        <img src={gifs.loader} alt="loader" style={{ width: 60, height: 60 }} />
        <span>{message}</span>
      </div>
    );
  },
  Avatar: ({
    image_url,
    fullname,
    size,
  }: {
    image_url: string;
    fullname: string;
    size: number;
  }) => {
    var initials = fullname
      .split(" ")
      .map((e) => e.charAt(0))
      .join("");
    if (image_url)
      return (
        <img
          src={image_url}
          alt={fullname}
          style={{
            objectFit: "cover",
            width: size,
            height: size,
            borderRadius: size,
          }}
        />
      );
    else
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: size,
            backgroundColor: avatarColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold" }}>{initials}</span>
        </div>
      );
  },
  Achievement: ({
    image_url,
    title,
    description,
    size,
    count,
    index,
  }: {
    image_url: string;
    title: string;
    description: string;
    size: number;
    count: number;
    index: number;
  }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    // count = 1000000;
    var countString = "";
    if (count > 1 && count < 100) {
      countString += count;
    } else if (count >= 100) {
      countString += "99+";
    }
    return (
      <div className=" py-2 pe-3 d-flex flex-column justify-content-center align-items-center">
        <div style={{ position: "relative" }}>
          <img
            id={`Tooltip${index}`}
            src={image_url}
            alt={title}
            style={{
              objectFit: "cover",
              width: size,
              height: size,
            }}
          />

          {count > 1 && (
            <div
              style={{
                position: "absolute",
                bottom: 5,
                right: -10,
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 2,
                paddingBottom: 2,
                backgroundColor: "#f9bfa7",
                borderRadius: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                style={{ fontSize: 10, textAlign: "center" }}
              >{`x${countString}`}</span>
            </div>
          )}
        </div>
        <Tooltip
          placement={"top"}
          isOpen={tooltipOpen}
          target={`Tooltip${index}`}
          toggle={toggle}
          style={{
            opacity: 1,
            backgroundColor: "white",
            border: "solid #ddd 0.5px",
            padding: 10,
            color: "black",
          }}
        >
          <h5 className=" border-bottom ">{title}</h5>
          <p>{description}</p>
        </Tooltip>
      </div>
    );
  },
  SearchBar: (props: any) => {
    const { apiCallback, searchFor } = props;
    // const [search, updateSearch] = useState("");
    return (
      <InputGroup className=" col-12 border-bottom border-bottom-4 border-dark ps-2 pb-1 align-items-center">
        <img
          className="     col-auto me-3"
          src={icons.search_black}
          height={20}
          width={20}
          alt="Search"
        />
        <DebounceInput
          className=" d-flex flex-grow-1 border-0"
          minLength={2}
          debounceTimeout={300}
          style={{ outline: "none" }}
          placeholder={`Search ${searchFor}...`}
          onChange={async (e: any) => {
            // updateSearch(e.target.value);
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
        className=" container"
        style={{ height: 600, justifyContent: "center", alignItems: "center" }}
      >
        <Row className=" justify-content-center">
          <p className=" text-center">Error {error}</p>
        </Row>
      </div>
    );
  },
};

export default Generic;
