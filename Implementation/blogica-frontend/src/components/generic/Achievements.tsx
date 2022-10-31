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
import moment from "moment";

/* component/screen inports */

/* helper imports */
import {
  Article,
  Award,
  PublishedDetails,
  User,
  UserDetails,
  UserDetailArticleSegment,
} from "../../config/types";
import { icons, constants } from "../../config/configuration";
import Generic from "../../components/generic/GenericComponents";

const Achievements = ({ badges }: any) => {
  return (
    <Row className=" border-top py-3">
      <h5
        style={{
          overflowWrap: "break-word",
          margin: 0,
        }}
      >
        Achievements
      </h5>
      <Col className="mt-1 d-flex flex-wrap">
        {badges.map((badge: Award, index: number) => {
          return (
            <Generic.Achievement
              {...badge}
              size={50}
              key={index}
              index={index}
            />
          );
        })}
      </Col>
    </Row>
  );
};

export default Achievements;
