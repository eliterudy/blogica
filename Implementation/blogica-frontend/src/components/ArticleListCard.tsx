import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import { ArticleCardProps } from "../config/types";
import Generic from "./generic/GenericComponents";
import { constants } from "../config/configuration";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";

// https://picsum.photos/seed/picsum/200/300)

const ArticleListCard = (cardProps: ArticleCardProps) => {
  const { article, index, showAuthorDetails = true } = cardProps;
  const navigate = useNavigate();
  const [saveTooltipStatus, updateSaveTooltipStatus] = useState(false);
  const [editTooltipStatus, updateEditTooltipStatus] = useState(false);
  const [deleteTooltipStatus, updateDeleteTooltipStatus] = useState(false);

  const state = useSelector((state: any) => {
    return {
      userState: state.userActionReducer,
    };
  });

  const { user } = state.userState;
  const toggleSaveTooltip = () => updateSaveTooltipStatus(!saveTooltipStatus);
  const toggleEditTooltip = () => updateEditTooltipStatus(!editTooltipStatus);
  const toggleDeleteTooltip = () =>
    updateDeleteTooltipStatus(!deleteTooltipStatus);

  return (
    <Link
      to={`/main/article/id/${article._id}`}
      state={{ articleId: article._id }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className=" d-flex">
        <div className="col-8 col-sm-9 col-lg-10   pe-4 d-flex flex-column justify-content-between ">
          <div>
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
                className=" col-12"
                readOnly={true}
                style={{}}
                theme="bubble"
                value={article.description}
              />
            </div>
          </div>

          <div className="col-12 d-flex flex-row justify-content-between flex-wrap pt-1 ">
            <div className="col-12 col-sm-5">
              <span style={{ fontSize: 14, color: "#555" }}>
                {moment(article.createdAt).fromNow()}
              </span>
            </div>
            {user && (
              <div className=" faCustomIcons d-flex align-items-center justify-content-end col-12 col-sm-7">
                {(user.articles.drafts.includes(article._id) ||
                  user.articles.published.includes(article._id)) && (
                  <div
                    className="pe-2"
                    id="edit"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // navigate(`/main/author/id/${article.author._id}`);
                    }}
                  >
                    <i
                      className="fa fa-pencil-square-o fa-lg"
                      aria-hidden="true"
                    ></i>

                    <Tooltip
                      placement={"top"}
                      isOpen={editTooltipStatus}
                      target={"edit"}
                      toggle={toggleEditTooltip}
                    >
                      Edit
                    </Tooltip>
                  </div>
                )}
                {user.articles.drafts.includes(article._id) && (
                  <div
                    className="px-1"
                    id="delete"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // navigate(`/main/author/id/${article.author._id}`);
                    }}
                  >
                    <i className="fa fa-trash-o fa-lg" aria-hidden="true"></i>

                    <Tooltip
                      placement={"top"}
                      isOpen={deleteTooltipStatus}
                      target={"delete"}
                      toggle={toggleDeleteTooltip}
                    >
                      Trash
                    </Tooltip>
                  </div>
                )}
                <div
                  className="ps-2"
                  id="save"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // navigate(`/main/author/id/${article.author._id}`);
                  }}
                >
                  {user.articles.saved.includes(article._id) ? (
                    <i className="fa fa-bookmark fa-lg" />
                  ) : (
                    <i className="fa fa-bookmark-o fa-lg" />
                  )}
                  <Tooltip
                    placement={"top"}
                    isOpen={saveTooltipStatus}
                    target={"save"}
                    toggle={toggleSaveTooltip}
                  >
                    Save
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className={`col-4 col-sm-3 col-lg-2    d-flex flex-column justify-content-end `}
        >
          <div
            className="img-fluid "
            style={{
              backgroundImage: `url(${process.env.REACT_APP_API_URL +
                article.image_url})`,
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
