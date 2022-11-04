/* package inports */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Col } from "reactstrap";

/* component/screen inports */

/* helper imports */

const AuthorInfo = ({ article }: any) => {
  const navigate = useNavigate();
  return (
    <Col className=" noselect col-12 col-md-8 px-4 px-md-0 py-5  ">
      <p className=" noselect h4 col-12 mb-3">About the author</p>

      <div className=" noselect col-12 d-flex flex-row align-items-center">
        <div className=" noselect d-flex flex-column">
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/main/author/id/${article.author._id}`);
            }}
            className=" noselect   cursorPointer   text-primary"
            style={{ fontWeight: "bold", fontSize: 16 }}
          >
            {`${article.author.firstname} ${article.author.lastname}`}
          </span>
          <p
            className=" noselect col-12"
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
          <em className=" noselect col-12 h6 text-secondary">
            Liked this article and want to read more by this author? Check out
            the{" "}
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/main/author/id/${article.author._id}`);
              }}
              className=" noselect  cursorPointer    text-primary text-decoration-underline"
            >
              {`author's profile page`}
            </span>
          </em>
        </div>
      </div>
    </Col>
  );
};

export default AuthorInfo;
