/* package inports */

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  Toast,
  ToastBody,
} from "reactstrap";
import { Dispatch } from "@reduxjs/toolkit";
import ReactQuill from "react-quill";

/* component/screen inports */

/* helper imports */
import apis from "../../../config/api";
import { constants, gifs, icons } from "../../../config/configuration";
import {
  addArticlesToArticleCategory,
  deleteArticlesFromArticleCategory,
} from "../../../redux/actionReducers/userReducer";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

const ArticleBody = ({ article, url, updateArticle }: any) => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();

  const state = useSelector((state: any) => {
    return { userState: state.userActionReducer };
  });
  const { user } = state.userState;

  const [isModalOpen, updateModalOpen] = useState(false);
  const [deleteArticleLoading, updateDeleteArticleLoading] = useState(false);
  const [isLinkToastOpen, updateLinkToastOpen] = useState(false);
  const [isAnimationPlaying, updateAnimationPlaying] = useState(false);
  const toggleModal = () => updateModalOpen(!isModalOpen);

  var likeIcon = <img src={icons.like_unselected} />;
  if (user && user.articles && !user.articles.favorites.includes(article._id)) {
    likeIcon = (
      <img style={{ width: 31, marginTop: 2 }} src={icons.like_unselected} />
    );
  } else {
    likeIcon = (
      <img style={{ width: 31, marginTop: 2 }} src={icons.like_selected} />
    );
  }

  var likeAnimation = <img style={{ width: 40 }} src={gifs.like} />;

  return (
    <div className=" noselect col-12 ">
      <div className=" noselect d-flex justify-content-between align-items-center flex-wrap">
        <span className=" noselect flex-1 h1 fw-bold">{article.title}</span>
        <div>
          {user &&
            article &&
            article.author &&
            user._id.toString() !== article.author._id.toString() &&
            article.is_published &&
            user.articles &&
            user.articles.saved && (
              <Button
                className=" noselect rounded-pill  px-4 bg-primary"
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
                        })
                        .catch((error) => {
                          alert(constants.OOPS_MESSAGE);
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
                        })
                        .catch((error) => {
                          alert(constants.OOPS_MESSAGE);
                        });
                }}
              >
                {user.articles.saved.includes(article._id)
                  ? "Remove From Bookmarks"
                  : "Save To Bookmarks"}
              </Button>
            )}

          {user &&
            article &&
            article.author &&
            user._id === article.author._id && (
              <Button
                className=" noselect rounded-pill  px-4 bg-primary border-0 "
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
                ></i>{" "}
                <span>Edit Article</span>
              </Button>
            )}
          {user &&
            user._id.toString() == article.author._id.toString() &&
            article.is_published === false &&
            user.articles && (
              <Button
                className=" noselect rounded-pill px-4 ms-3  bg-danger border-0 "
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleModal();
                }}
              >
                <i
                  className=" noselect fa fa-trash-o fa-lg"
                  aria-hidden="true"
                ></i>{" "}
              </Button>
            )}
        </div>
      </div>
      <div className=" noselect d-flex flex-column align-items-center">
        <div
          className=" noselect img-fluid my-4 col-12"
          style={{
            backgroundImage: `url(${article.image_url})`,
            aspectRatio: "1/1",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <ReactQuill
        readOnly={true}
        className=" noselect p-0 col-12 pb-4 "
        style={{ flex: 1, backgroundColor: "#fff" }}
        theme="bubble"
        value={article.description}
      />

      {user && user.articles && article.is_published && (
        <div className=" noselect col-12 row mx-0  my-4 p-0 align-items-end ">
          <div className=" noselect col-12 col-md-6 px-0 d-flex flex-row align-items-center justify-content-between">
            <div className=" noselect flex-1 d-flex flex-row align-items-end">
              <Button
                className=" noselect border-0 bg-transparent p-0"
                disabled={isAnimationPlaying}
                style={{ width: 40, height: 40 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (
                    user &&
                    user.articles &&
                    !user.articles.favorites.includes(article._id)
                  ) {
                    updateAnimationPlaying(true);
                    setTimeout(() => {
                      updateAnimationPlaying(false);
                    }, 2000);

                    apis
                      .postToCategory(
                        { property: "articles", category: "favorites" },
                        { id: article._id }
                      )
                      .then(({ data }) => {
                        dispatch(
                          addArticlesToArticleCategory({
                            articleCategory: "favorites",
                            articleId: article._id,
                          })
                        );
                        updateArticle({
                          ...article,
                          number_of_likes: article.number_of_likes + 1,
                        });
                      })
                      .catch((error) => {
                        alert(constants.OOPS_MESSAGE);
                      });
                  } else {
                    apis
                      .deleteFromCategory(
                        { property: "articles", category: "favorites" },
                        { id: article._id }
                      )
                      .then(({ data }) => {
                        dispatch(
                          deleteArticlesFromArticleCategory({
                            articleCategory: "favorites",
                            articleId: article._id,
                          })
                        );
                        updateArticle({
                          ...article,
                          number_of_likes: article.number_of_likes - 1,
                        });
                      })
                      .catch((error) => {
                        alert(constants.OOPS_MESSAGE);
                      });
                  }
                }}
              >
                {isAnimationPlaying ? likeAnimation : likeIcon}
              </Button>

              <span
                className=" noselect ms-2 text-secondary pb-1"
                style={{ fontWeight: "normal" }}
              >
                {`${article.number_of_likes} ${
                  article.number_of_likes == 1 ? "like" : "likes"
                }`}
              </span>
            </div>
          </div>
          <div className=" noselect faCustomIcons col-12 px-0 pt-2 pt-md-0 col-md-6 d-flex flex-row align-items-end justify-content-start justify-content-md-end pb-1">
            <span className=" noselect text-secondary">Share with: </span>{" "}
            <EmailShareButton
              children={<i className=" noselect fa fa-envelope fa-lg mx-2" />}
              url={url}
              subject={`Check this amazing article published on ${constants.APP_NAME}`}
              body={`I read this amazing article on ${constants.APP_NAME} about ${article.title}. 
      I think this article will interest you, so give it a read! `}
            />
            <FacebookShareButton
              children={<i className=" noselect fa fa-facebook fa-lg mx-2" />}
              url={url}
            />
            <TwitterShareButton
              children={<i className=" noselect fa fa-twitter fa-lg mx-2" />}
              url={url}
              title={article.title}
            />
            <LinkedinShareButton
              children={
                <i className=" noselect fa fa-linkedin-square fa-lg mx-2 " />
              }
              url={url}
              title={article.title}
              summary={`I read this amazing article on ${constants.APP_NAME} about ${article.title}. 
      I think this article will interest you, so give it a read! `}
            />
            <div style={{ position: "relative" }}>
              <div
                className=" noselect position-absolute"
                style={{ top: 30, right: 0 }}
              >
                <Toast
                  style={{ backgroundColor: "black" }}
                  isOpen={isLinkToastOpen}
                >
                  <ToastBody style={{ color: "white" }}>Link Copied</ToastBody>
                </Toast>
              </div>
              <i
                className=" noselect fa fa-link fa-lg mx-2"
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
      )}
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
                  updateDeleteArticleLoading(false);
                  toggleModal();
                  navigate(-1);
                })
                .catch((error) => {
                  alert(constants.OOPS_MESSAGE);

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

export default ArticleBody;
