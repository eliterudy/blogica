import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import { ArticleCardProps } from "../config/types";
import Generic from "./generic/GenericComponents";
import { constants } from "../config/configuration";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

// https://picsum.photos/seed/picsum/200/300)

const ArticleListCard = (cardProps: ArticleCardProps) => {
  const { article, index, showAuthorDetails = true } = cardProps;
  const navigate = useNavigate();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  // var bookmarkIcon = () => {
  //   if (article.isBookmarked) {
  //     return <i className="fa fa-bookmark fa-lg" id="bookmark"></i>;
  //   }
  //   return <i className="fa fa-bookmark-o fa-lg" id="bookmark"></i>;
  // };
  return (
    <Link
      to={`/main/article/id/${article._id}`}
      state={{ recipeId: article._id }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className=" d-flex mb-2">
        <div className=" col-10 pe-4 ">
          {showAuthorDetails && (
            <div className="d-flex flex-row align-items-center">
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
                  size={25}
                />
              </div>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/main/author/id/${article.author._id}`);
                }}
                className=" ms-2 text-primary"
                style={{ fontWeight: "bold", fontSize: 14 }}
              >
                {`${article.author.firstname} ${article.author.lastname}`}
              </span>
            </div>
          )}

          <h6
            className=" mt-2 col-12 "
            style={{
              fontSize: 22,
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
          >
            {article.title}
          </h6>
          <div
            className="cardDescription"
            // style={{ height: 60, overflow: "hidden" }}
          >
            <ReactQuill
              className=" mb-2  col-12"
              readOnly={true}
              style={{ marginLeft: -12 }}
              theme="bubble"
              value={article.description}
            />
          </div>
          {/* <span
            className=" mb-2  col-12"
            style={{
              fontSize: 16,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {article.description}
          </span> */}
          <div className="col-12 d-flex flex-row justify-content-between mt-1 ">
            <div>
              <span style={{ fontSize: 14, color: "#555" }}>
                {moment(article.createdAt, "YYYYMMDD").fromNow()}
              </span>
            </div>
            <div className="mt-1">
              {/* <span>
                {bookmarkIcon()}
                <Tooltip
                  className=""
                  placement={"top"}
                  isOpen={tooltipOpen}
                  target={"bookmark"}
                  toggle={toggle}
                >
                  Save
                </Tooltip>
              </span> */}
            </div>
          </div>
        </div>
        <div className="col-2 d-flex flex-column justify-content-center">
          <div
            onClick={() => {}}
            className="img-fluid"
            style={{
              backgroundImage: `url(${article.image_url})`,
              aspectRatio: "1/1",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleListCard;
