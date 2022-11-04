import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
} from "reactstrap";
import { ArticleCardProps } from "../config/types";
import Generic from "./generic/GenericComponents";
import { constants } from "../config/configuration";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import apis from "../config/api";
import { Dispatch } from "@reduxjs/toolkit";
import {
  addArticlesToArticleCategory,
  deleteArticlesFromArticleCategory,
} from "../redux/actionReducers/userReducer";

const ArticleListCard = (cardProps: ArticleCardProps) => {
  const dispatch: Dispatch<any> = useDispatch();

  const {
    article,
    index,
    showAuthorDetails = true,
    deleteCallback = () => {},
    addCallback = () => {},
  } = cardProps;
  const navigate = useNavigate();
  const [saveTooltipStatus, updateSaveTooltipStatus] = useState(false);
  const [editTooltipStatus, updateEditTooltipStatus] = useState(false);
  const [deleteTooltipStatus, updateDeleteTooltipStatus] = useState(false);
  const [isModalOpen, updateModalOpen] = useState(false);
  const [deleteArticleLoading, updateDeleteArticleLoading] = useState(false);

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
  const toggleModal = () => updateModalOpen(!isModalOpen);

  return (
    <div
      className=" noselect  d-flex "
      style={{ textDecoration: "none" }}
      onClick={() => {
        if (user && user._id && user._id !== article.author._id) {
          apis
            .postToCategory(
              { category: "recents", property: "articles" },
              { id: article._id }
            )
            .then(({ data }) => {})
            .catch((error) => {});
        }
        navigate(`/main/article/id/${article._id}`, {
          state: { articleId: article._id },
        });
      }}
    >
      <div className=" noselect col-8 col-sm-9 col-lg-10   pe-4 d-flex flex-column justify-content-between ">
        <div>
          {showAuthorDetails && (
            <div className=" noselect d-flex flex-row align-items-center">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/main/author/id/${article.author._id}`);
                }}
              >
                <Generic.Avatar
                  image_url={article.author.image_url}
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
                className=" noselect  ms-2 text-primary cursorPointer"
                style={{ fontWeight: "bold", fontSize: 14 }}
              >
                {`${article.author.firstname} ${article.author.lastname}`}
              </span>
            </div>
          )}

          <h6
            className=" noselect  mt-2 col-12 "
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
            className=" noselect cardDescription"
            // style={{ height: 60, overflow: "hidden" }}
          >
            <ReactQuill
              className=" noselect cursorPointer  col-12"
              readOnly={true}
              style={{}}
              theme="bubble"
              value={article.description}
            />
          </div>
        </div>

        <div className=" noselect col-12 d-flex flex-row justify-content-between flex-wrap pt-1 ">
          <div className=" noselect col-12 col-sm-7 d-flex flex-wrap py-1">
            <span style={{ fontSize: 14, color: "#555" }}>
              {moment(article.createdAt).fromNow()}
            </span>
            {user && user.articles.drafts.includes(article._id) && (
              <div className=" noselect d-flex flex-wrap ms-2">
                <div
                  className=" noselect d-flex flex-wrap"
                  style={{
                    padding: 1,
                    paddingLeft: 10,
                    paddingRight: 10,
                    backgroundColor: "#eee",
                    borderRadius: 40,
                  }}
                >
                  <span style={{ fontSize: 14 }}>Draft mode</span>
                </div>
              </div>
            )}
          </div>
          {user && (
            <div className=" noselect   d-flex align-items-center justify-content-start justify-content-sm-end col-12 col-sm-5 py-1">
              {(user.articles.drafts.includes(article._id) ||
                user.articles.published.includes(article._id)) && (
                <div
                  className=" noselect pe-3 pe-sm-0 ps-sm-3 faCustomIcons cursorPointer"
                  id="edit"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(`/main/article/edit`, {
                      state: {
                        formData: {
                          title: article.title,
                          description: article.description,
                        },
                        is_published: article.is_published,
                        _id: article._id,
                      },
                    });
                  }}
                >
                  <i
                    className=" noselect fa fa-pencil-square-o fa-lg"
                    aria-hidden="true"
                  ></i>

                  <Tooltip
                    placement={"top"}
                    isOpen={editTooltipStatus}
                    target={"edit"}
                    toggle={toggleEditTooltip}
                  >
                    Edit Article
                  </Tooltip>
                </div>
              )}
              {user.articles.drafts.includes(article._id) && (
                <div
                  className=" noselect pe-3 pe-sm-0 ps-sm-3 faDeleteIcon cursorPointer"
                  id="delete"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleModal();
                  }}
                >
                  <i
                    className=" noselect fa fa-trash-o fa-lg"
                    aria-hidden="true"
                  ></i>

                  <Tooltip
                    placement={"top"}
                    isOpen={deleteTooltipStatus}
                    target={"delete"}
                    toggle={toggleDeleteTooltip}
                  >
                    Delete Article
                  </Tooltip>
                </div>
              )}
              {user && user._id && user._id !== article.author._id ? (
                <div
                  className=" noselect pe-3 pe-sm-0 ps-sm-3 cursorPointer"
                  id="save"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    !user.articles.saved.includes(article._id)
                      ? apis
                          .postToCategory(
                            { property: "articles", category: "saved" },
                            { id: article._id }
                          )
                          .then(({ data }) => {
                            dispatch(
                              addArticlesToArticleCategory({
                                articleCategory: "saved",
                                articleId: article._id,
                              })
                            );
                            addCallback(article, "saved");
                          })
                          .catch(({ response, message }) => {
                            if (message && message === "Network Error") {
                              alert(constants.NO_INTERNET_ALERT_MESSAGE);
                            } else {
                              if (
                                response &&
                                response.data &&
                                response.data.error
                              )
                                alert(response.data.error);
                            }
                          })
                      : apis
                          .deleteFromCategory(
                            { property: "articles", category: "saved" },
                            { id: article._id }
                          )
                          .then(({ data }) => {
                            dispatch(
                              deleteArticlesFromArticleCategory({
                                articleCategory: "saved",
                                articleId: article._id,
                              })
                            );
                            deleteCallback(index, "saved");
                          })
                          .catch(({ response, message }) => {
                            if (message && message === "Network Error") {
                              alert(constants.NO_INTERNET_ALERT_MESSAGE);
                            } else {
                              if (
                                response &&
                                response.data &&
                                response.data.error
                              )
                                alert(response.data.error);
                            }
                          });
                  }}
                >
                  {user.articles.saved.includes(article._id) ? (
                    <i className=" noselect fa fa-bookmark fa-lg" />
                  ) : (
                    <i className=" noselect fa fa-bookmark-o fa-lg" />
                  )}
                  <Tooltip
                    placement={"top"}
                    isOpen={saveTooltipStatus}
                    target={"save"}
                    toggle={toggleSaveTooltip}
                  >
                    Save Article
                  </Tooltip>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <div
        className={`col-4 col-sm-3 col-lg-2    d-flex flex-column justify-content-end `}
      >
        <div
          className=" noselect img-fluid "
          style={{
            backgroundImage: `url(${article.image_url})`,
            aspectRatio: "1/1",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <Modal
        style={{
          paddingTop: 50,
        }}
        isOpen={isModalOpen}
      >
        <ModalHeader
          className=" noselect    "
          charCode="Y"
          toggle={() => toggleModal()}
        >
          Delete Article
        </ModalHeader>
        <ModalBody className=" noselect    ">
          You are about to delete the article titled{" "}
          <strong>{article.title}</strong>. Are you sure you wish to delete this
          article?
        </ModalBody>
        <ModalFooter>
          <Button
            className=" noselect bg-danger"
            onClick={() => {
              updateDeleteArticleLoading(true);
              apis
                .deleteArticle(article._id)
                .then(({ data }) => {
                  deleteCallback(index, "drafts");
                  updateDeleteArticleLoading(false);
                  toggleModal();
                })
                .catch(({ response, message }) => {
                  if (message && message === "Network Error") {
                    alert(constants.NO_INTERNET_ALERT_MESSAGE);
                  } else {
                    if (response && response.data && response.data.error)
                      alert(response.data.error);
                  }
                  updateDeleteArticleLoading(false);
                  toggleModal();
                });
            }}
          >
            {deleteArticleLoading ? (
              <Spinner color="light" size="sm" />
            ) : (
              <b>Yes, I'm sure</b>
            )}
          </Button>
          <Button onClick={() => toggleModal()}>
            <span>Don't delete</span>
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ArticleListCard;
