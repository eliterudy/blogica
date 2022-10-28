import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { cssHover } from "../../../components/generic/hoverProps";
import { ArticleCardProps, ContributorCardProps } from "../../../config/types";
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

const ContributorListCard = (cardProps: ContributorCardProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state: any) => {
    // eslint-disable-next-line no-labels, no-label-var
    return { userState: state.userActionReducer };
  });
  const { user } = state.userState;

  const { contributor, index } = cardProps;
  const { _id, image_url, firstname, lastname, bio } = contributor;
  const cardHoverStlye = cssHover(
    {
      transform: "scale(1.05)",
      zIndex: 10,
      transition: "0.5s",
    },
    { transition: "0.3s" }
  );

  return (
    <Link
      to={`/main/author/id/${_id}`}
      state={{ authorId: _id }}
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
                aspectRatio: "1/1",
                objectFit: "cover",
                backgroundImage: `url(${image_url})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                // UPDATE HERE LATER:  justifyContent: user ? "space-between" : "flex-end",
                justifyContent: true ? "space-between" : "flex-end",
                alignItems: "flex-end",
              }}
            >
              {/* <div
                className="noselect px-2 mb-1 me-1 py-1"
                style={{ backgroundColor: "antiquewhite", borderRadius: 50 }}
              >
                {} min
              </div> */}
            </div>
            <div className="noselect p-4 pb-2">
              <CardTitle tag="h5" style={{ color: "black" }}>
                {`${firstname} ${lastname}`}
              </CardTitle>
              <CardSubtitle
                className="noselect mb-2 text-muted"
                tag="h6"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {`${bio}`}
              </CardSubtitle>
            </div>
          </CardBody>
        </Card>
      </div>
    </Link>
  );
};

export default ContributorListCard;
