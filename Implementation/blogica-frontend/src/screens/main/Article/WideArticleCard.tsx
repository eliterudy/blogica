import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { cssHover } from "../../../components/generic/hoverProps";
import { ArticleCardProps } from "../../../config/types";
import { icons } from "../../../config/configuration";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import actions from "../../../redux/actionReducers/index";
import apis from "../../../config/api";
import { gifs } from "../../../config/configuration";

// const {
//   addArticleToFavorites,
//   deleteArticleFromFavorites,
//   addArticleToRecents,
// } = actions;

const ArticleListCard = (cardProps: ArticleCardProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state: any) => {
    return {
      userState: state.userActionReducer,
    };
  });
  // const { userState } = state;
  // const { user } = userState;
  const user = true;

  const [isMouseHoveredOnBookmarkButton, changeMouseStatus] = useState(false);
  const { article, index, redirect } = cardProps;
  const {
    _id,
    title,
    imageUrl,
    description,
    author,
    isBookmarked,
    created,
    updated,
  } = article;
  const cardHoverStlye = cssHover(
    {
      transform: "scale(1.05)",
      zIndex: 10,
      transition: "0.5s",
    },
    { transition: "0.3s" }
  );
  var bookmarkIcon = () => {
    if (isMouseHoveredOnBookmarkButton) {
      return icons.bookmark_hover;
    } else if (isBookmarked) {
      return icons.bookmark_selected;
    }
    return icons.bookmark_unselected;
  };
  return (
    <Link
      to={redirect}
      state={{ recipeId: article._id }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div
        {...cardHoverStlye}
        onClick={() => {
          // user &&
          // apis
          //   .postToCategory({
          //     property: "recents",
          //     category: "recipes",
          //     id: data._id,
          //   })
          //   .then(({ data }) => {
          //     dispatch(addRecipeToRecents(data._id));
          //   })
          //   .catch((err) => {
          //     alert(
          //       "Oops! Something went wrong. Could not add this recipe to recents"
          //     );
          //   });
        }}
      >
        <Card className="noselect  col-12 col-sm-12 ">
          <CardBody className="noselect p-0">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <div
              className="noselect w-100 img-fluid center"
              style={{
                borderTopRightRadius: 4,
                borderTopLeftRadius: 4,
                height: 320,
                objectFit: "cover",
                backgroundImage: `url(${imageUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: user ? "space-between" : "flex-end",
                alignItems: "flex-end",
              }}
            >
              {user && (
                <div
                  className="noselect  "
                  style={{
                    marginTop: -13,
                    padding: 5,
                  }}
                >
                  <img
                    onMouseEnter={() => changeMouseStatus(true)}
                    onMouseLeave={() => changeMouseStatus(false)}
                    onMouseDown={() => changeMouseStatus(false)}
                    className="noselect col-auto "
                    src={bookmarkIcon()}
                    height={45}
                    width={45}
                    alt="Recipe Diary"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // isBookmarked
                      //   ? apis
                      //       .deleteFromCategory({
                      //         property: "favorites",
                      //         category: "recipes",
                      //         id: _id,
                      //       })
                      //       .then(({ data }) => {
                      //         dispatch(deleteRecipeFromFavorites(_id));
                      //       })
                      //       .catch((err) => {
                      //         if (
                      //           err &&
                      //           err.message &&
                      //           err.message === "Network Error"
                      //         ) {
                      //           if (navigator.onLine) {
                      //             navigate("/server-down", {
                      //               state: { redirectPath: "/" },
                      //             });
                      //           } else {
                      //             alert(
                      //               "This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again"
                      //             );
                      //           }
                      //         } else {
                      //           alert("Oops! Something went wrong");
                      //         }
                      //       })
                      //   : apis
                      //       .postToCategory({
                      //         property: "favorites",
                      //         category: "recipes",
                      //         id: data._id,
                      //       })
                      //       .then(({ data }) => {
                      //         dispatch(addRecipeToFavorites(_id));
                      //       })
                      //       .catch((err) => {
                      //         if (
                      //           err &&
                      //           err.message &&
                      //           err.message === "Network Error"
                      //         ) {
                      //           if (navigator.onLine) {
                      //             navigate("/server-down", {
                      //               state: { redirectPath: "/" },
                      //             });
                      //           } else {
                      //             alert(
                      //               "This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again"
                      //             );
                      //           }
                      //         } else {
                      //           alert("Oops! Something went wrong");
                      //         }
                      //       });
                    }}
                  />
                </div>
              )}
              <div
                className="noselect px-2 mb-1 me-1 py-1"
                style={{ backgroundColor: "antiquewhite", borderRadius: 50 }}
              >
                {} min
              </div>
            </div>
            <div className="noselect p-4 pb-2">
              <CardTitle tag="h5" style={{ color: "black" }}>
                {title}
              </CardTitle>
              <CardSubtitle className="noselect mb-2 text-muted" tag="h6">
                {`${""} | ${""} | ${""} servings`}
              </CardSubtitle>
            </div>
          </CardBody>
        </Card>
      </div>
    </Link>
  );
};

export default ArticleListCard;
