/* package inports */
import React, { useEffect, useState } from "react";
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
import { NavLink as RRNavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";

/* component/screen inports */

/* helper imports */
import { cssHover } from "./generic/hoverProps";
import { icons } from "../config/configuration";
import Generic from "../components/generic/GenericComponents";
import { toggler } from "../utils/generic";
import actions from "../redux/actionReducers/index";

const Header = ({ modalCallback }: any) => {
  const dispatch: Dispatch<any> = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const myStuffNavItemStyle = cssHover(
    {
      color: "#2b59a1",
      cursor: "pointer",
    },
    {
      color: "#777",
      cursor: "pointer",
    }
  );

  const signInButtonStyle = cssHover(
    {
      backgroundColor: "#2b59a1",
      color: "white",
    },
    {
      backgroundColor: "white",
      color: "#2b59a1",
    },
    {
      cursor: "pointer",
      border: "1px solid #2b59a1",
    }
  );

  const navigate = useNavigate();
  const [isNavOpen, updateNavOpen] = useState(false);
  const [isDropdownOpen, updateDropdown] = useState(false);
  const [myProfileDropdown, updateMyProfileDropdown] = useState(false);
  const [user, updateUser] = useState(false);

  const state = useSelector((state: any) => {});

  return (
    <div className="col-12">
      {/* Show toggle button when size is smaller than md */}
      <Navbar light expand="md" className=" border-bottom col-12 flex-row">
        <div
          className=" container-fluid px-sm-4 row mx-sm-0"
          // style={{display: 'flex', flexDirection: 'row'}}
        >
          {/* Toggle button to show/hide recipes list/elements */}
          {isTabletOrMobile && (
            <div className="col-2 d-flex flex-column justify-content-center">
              <NavbarToggler
                onClick={() => toggler(isNavOpen, updateNavOpen)}
                style={{
                  padding: 0,
                  minHeight: 50,
                  minWidth: 50,
                  maxWidth: 70,
                  maxHeight: 70,
                }}
              />
            </div>
          )}

          {isTabletOrMobile && (
            <NavbarBrand className=" col-8 col-md-2 m-sm-0 p-sm-0" href="/">
              <div
                className=" d-flex justify-content-center align-items-center"
                style={{ marginLeft: 12 }}
              >
                <img
                  className=" col-auto"
                  src={icons.app_logo}
                  height={60}
                  width={60}
                  alt="Blogica"
                />
              </div>
            </NavbarBrand>
          )}

          {/* Wrapper to collapse. Has a key isOpen  */}
          <Collapse className=" " isOpen={isNavOpen} navbar>
            {/* Navigation */}
            <Nav navbar className=" col-sm-12 ">
              {!user && (
                <NavItem className=" ms-sm-2 flex-grow-1 flex-shrink-1 d-sm-flex flex-column justify-content-center">
                  <NavLink
                    tag={RRNavLink}
                    className={"nav-link "}
                    to="/main/articles"
                  >
                    <div className=" d-flex flex-row justify-content-start justify-content-md-center align-items-center ">
                      <i
                        className="fa fa-file-text-o fa-lg me-2 "
                        aria-hidden="true"
                      ></i>

                      <span>Articles</span>
                    </div>
                  </NavLink>
                </NavItem>
              )}
              {user && (
                <NavItem className=" ms-sm-2 flex-grow-1 flex-shrink-1 d-sm-flex flex-column justify-content-center">
                  <NavLink tag={RRNavLink} className={"nav-link "} to="/">
                    <div className=" d-flex flex-row justify-content-start justify-content-md-center align-items-center ">
                      <i className="fa fa-home fa-lg me-2" />
                      <span className="mb-0 pb-0">Home</span>
                    </div>
                  </NavLink>
                </NavItem>
              )}
              <NavItem className=" ms-sm-2 flex-grow-1 flex-shrink-1 d-sm-flex flex-column justify-content-center">
                <NavLink
                  tag={RRNavLink}
                  className={"nav-link "}
                  to="/main/contributors"
                >
                  <div className=" d-flex flex-row justify-content-start justify-content-md-center align-items-center ">
                    <i className="fa  fa-pencil-square-o fa-lg me-2 " />
                    <span className="mb-0 pb-0">Contributors</span>
                  </div>
                </NavLink>
              </NavItem>
              {!isTabletOrMobile && (
                <NavItem className=" ms-sm-2 flex-grow-1 flex-shrink-1 d-sm-flex flex-column justify-content-center">
                  {/* <NavLink
                    tag={RRNavLink}
                    className={"nav-link  "}
                    to="/"

                  > */}
                  <div
                    onClick={() => updateUser(!user)}
                    className=" d-flex justify-content-center"
                    style={{ marginLeft: 12 }}
                  >
                    <img
                      className=" col-auto"
                      src={icons.app_logo}
                      height={70}
                      width={70}
                      alt="Blogica"
                    />
                  </div>
                  {/* </NavLink> */}
                </NavItem>
              )}
              {!user && (
                <NavItem className=" ms-sm-2 flex-grow-1 flex-shrink-1 d-sm-flex flex-column justify-content-center">
                  <NavLink
                    tag={RRNavLink}
                    className={"nav-link "}
                    to="/auth/signup"
                  >
                    <div className=" d-flex flex-row justify-content-start justify-content-md-center align-items-center ">
                      <i
                        className="fa fa-plus-square-o fa-lg  me-2 "
                        aria-hidden="true"
                      ></i>
                      <span className="mb-0 pb-0">Register</span>
                    </div>
                  </NavLink>
                </NavItem>
              )}
              {!user && (
                <NavItem className=" ms-sm-2 flex-grow-1 flex-shrink-1 d-sm-flex flex-column justify-content-center">
                  <NavLink
                    tag={RRNavLink}
                    className={"nav-link "}
                    to="/auth/signin"
                  >
                    <div className=" d-flex flex-row justify-content-start justify-content-md-center align-items-center ">
                      <i
                        className="fa fa-sign-in fa-lg me-2 "
                        aria-hidden="true"
                      ></i>

                      <span>Sign In</span>
                    </div>
                  </NavLink>
                </NavItem>
              )}

              {user && (
                <NavItem className=" ms-sm-2 flex-grow-1 flex-shrink-1 d-sm-flex flex-column justify-content-center">
                  <NavLink
                    tag={RRNavLink}
                    className={"nav-link "}
                    to="/main/articles"
                  >
                    <div className=" d-flex flex-row justify-content-start justify-content-md-center align-items-center ">
                      <i
                        className="fa fa-file-text-o fa-lg me-2 "
                        aria-hidden="true"
                      ></i>

                      <span>Articles</span>
                    </div>
                  </NavLink>
                </NavItem>
              )}

              {user && (
                <div className=" ms-sm-2 flex-grow-1 flex-shrink-1 d-sm-flex flex-column justify-content-center">
                  <div className=" d-flex flex-row justify-content-start justify-content-md-center align-items-center ">
                    <Dropdown
                      isOpen={isDropdownOpen}
                      toggle={() => {
                        updateDropdown(!isDropdownOpen);
                      }}
                    >
                      <DropdownToggle
                        style={{ backgroundColor: "white", border: "0px" }}
                      >
                        <Generic.Avatar imageUrl="" fullname="Gavin D'mello" />
                      </DropdownToggle>

                      <DropdownMenu style={{ marginTop: 14, marginRight: -15 }}>
                        <div
                          className="mx-3 mt-1 mb-2"
                          onClick={() =>
                            updateMyProfileDropdown(!myProfileDropdown)
                          }
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span> My Profile </span>
                          {myProfileDropdown ? (
                            <i className="fa fa-chevron-down " />
                          ) : (
                            <i className="fa fa-chevron-right " />
                          )}
                        </div>

                        {myProfileDropdown && (
                          <div>
                            <DropdownItem divider />
                            {/* For v2 */}
                            {/* <DropdownItem
                          onClick={() => {
                            navigate('/main/my-profile/', {
                              state: {tab: 0},
                            });
                          }}>
                          My Articles
                        </DropdownItem> */}
                            <DropdownItem
                              onClick={() => {
                                navigate("/main/my-profile/", {
                                  state: { tab: 1 },
                                });
                              }}
                            >
                              Recent Viewed
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                navigate("/main/my-profile/", {
                                  state: { tab: 2 },
                                });
                              }}
                            >
                              Saved Articles
                            </DropdownItem>
                          </div>
                        )}
                        <DropdownItem divider />
                        <DropdownItem onClick={() => {}}>Logout</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>{" "}
                  </div>
                </div>
              )}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
