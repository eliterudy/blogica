/* package inports */

import React, { useState, useRef, useEffect } from "react";
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
} from "reactstrap";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../components/generic/hoverProps";

import { icons } from "../../config/configuration";
import Generic from "../../components/generic/GenericComponents";
import { toggler } from "../../utils/generic";
import actions from "../../redux/actionReducers/index";

const Feeds = (props: any) => {
  const navigate = useNavigate();
  const [loading, isLoading] = useState(true);
  const [articles, updateArticles] = useState([]);
  const state = useSelector((state: any) => {
    return { user: true };
  });
  const { user } = state;

  useEffect(() => {
    // if (user) navigate("/main/feeds");
    // isLoading(false);
  }, []);

  return (
    <div className="col-12 d-flex flex-column  flex-grow-1">
      {loading && <Generic.Loader message="Loading" />}
      {!loading && articles && (
        <div className="">
          <p>Feeds</p>
        </div>
      )}
    </div>
  );
};

export default Feeds;
