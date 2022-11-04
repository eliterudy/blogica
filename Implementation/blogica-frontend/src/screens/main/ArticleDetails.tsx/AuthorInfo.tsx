/* package inports */
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col } from "reactstrap";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";

const AuthorInfo = ({ article }: any) => {
  const navigate = useNavigate();
  return (
    <Col className="      col-12 col-md-8 px-4 px-md-0 py-5  ">
      <p className=" h4 col-12 mb-3">About the author</p>

      <div className=" col-12 d-flex flex-row align-items-center">
        <div className=" d-flex flex-column">
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/main/author/id/${article.author._id}`);
            }}
            className="      text-primary"
            style={{ fontWeight: "bold", fontSize: 16 }}
          >
            {`${article.author.firstname} ${article.author.lastname}`}
          </span>
          <p
            className="      col-12"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {article.author.bio}
          </p>
          <em className="      col-12 h6 text-secondary">
            Liked this article and want to read more by this author? Check out
            the{" "}
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/main/author/id/${article.author._id}`);
              }}
              className="      text-primary text-decoration-underline"
            >
              {`author's profile page`}
            </span>
            {/* <a href={`/main/author/id/${article.author._id}`}></a> */}
          </em>
        </div>
      </div>
    </Col>
  );
};

export default AuthorInfo;
