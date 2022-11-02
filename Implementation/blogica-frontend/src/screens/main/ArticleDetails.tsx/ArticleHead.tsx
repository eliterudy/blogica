/* package inports */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  InstapaperShareButton,
  PinterestShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import moment from "moment";
import {
  Toast,
  ToastHeader,
  ToastBody,
  Tooltip,
  Spinner,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import apis from "../../../config/api";

const ArticleHead = ({ article, url }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: Dispatch<any> = useDispatch();
  const [editTooltipStatus, updateEditTooltipStatus] = useState(false);
  const toggleEditTooltip = () => updateEditTooltipStatus(!editTooltipStatus);

  const state = useSelector((state: any) => {
    return { userState: state.userActionReducer };
  });
  const { user } = state.userState;

  if (article.is_published) {
    const [isLinkToastOpen, updateLinkToastOpen] = useState(false);
    return (
      <div className="col-12 row mx-0  my-4 p-0 ">
        <div className="col-12 col-md-6 px-0 d-flex flex-row align-items-center justify-content-between">
          <div className="flex-1 d-flex flex-row align-items-center">
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/main/author/id/${article.author._id}`);
              }}
            >
              <Generic.Avatar
                image_url={
                  process.env.REACT_APP_API_URL + article.author.image_url
                }
                fullname={`${article.author.firstname} ${article.author.lastname}`}
                size={60}
              />
            </div>

            <div className="d-flex flex-column">
              <span
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/main/author/id/${article.author._id}`);
                }}
                className=" ms-2 text-primary"
                style={{ fontWeight: "bold", fontSize: 16 }}
              >
                {`${article.author.firstname} ${article.author.lastname}`}
              </span>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/main/author/id/${article.author._id}`);
                }}
                className=" ms-2 "
                style={{ fontSize: 14 }}
              >
                {`
          ${moment(article.created).format("MMM DD, YYYY")} 
          `}
              </span>
            </div>
          </div>
        </div>
        <div className=" faCustomIcons col-12 px-0 pt-2 pt-md-0 col-md-6 d-flex flex-row align-items-center justify-content-start justify-content-md-end">
          <span className="text-secondary">Share with: </span>{" "}
          <EmailShareButton
            children={<i className="fa fa-envelope fa-lg mx-2" />}
            url={url}
            subject={"Check this amazing article published on Blogica"}
            body={`I read this amazing article on Blogica about ${article.title}. 
          I think this article will interest you, so give it a read!`}
          />
          <FacebookShareButton
            children={<i className="fa fa-facebook fa-lg mx-2" />}
            url={url}
          />
          <TwitterShareButton
            children={<i className="fa fa-twitter fa-lg mx-2" />}
            url={url}
            title={article.title}
          />
          <LinkedinShareButton
            children={<i className="fa fa-linkedin-square fa-lg mx-2 " />}
            url={url}
            title={article.title}
            summary={`I read this amazing article on Blogica about ${article.title}. 
          I think this article will interest you, so give it a read!`}
          />
          <div style={{ position: "relative" }}>
            <div className="position-absolute" style={{ top: 30, right: 0 }}>
              <Toast
                style={{ backgroundColor: "black" }}
                isOpen={isLinkToastOpen}
              >
                <ToastBody style={{ color: "white" }}>Link Copied</ToastBody>
              </Toast>
            </div>
            <i
              className=" fa fa-link fa-lg mx-2"
              onClick={() => {
                navigator.clipboard.writeText(url);
                updateLinkToastOpen(true);
                setTimeout(() => {
                  updateLinkToastOpen(false);
                }, 2000);
              }}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex flex-wrap mb-2 align-items-center justify-content-start ">
        <div
          className="d-flex flex-wrap"
          style={{
            padding: 5,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: "#eee",
            borderRadius: 40,
          }}
        >
          <span>Draft mode</span>
        </div>
      </div>
    );
  }
};

export default ArticleHead;
