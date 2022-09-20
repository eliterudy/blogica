import React from "react";
import { ArticleCardProps } from "../../../config/types";
import Generic from "../../../components/generic/GenericComponents";
import { constants } from "../../../config/configuration";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

// https://picsum.photos/seed/picsum/200/300)

const WideArticleCard = (cardProps: ArticleCardProps) => {
  const { article, index, redirect } = cardProps;
  return (
    <Link
      to={redirect}
      state={{ recipeId: article._id }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className=" d-flex mb-2">
        <div className="col-8 pe-4">
          <div className=" d-flex flex-row align-items-center">
            <Generic.Avatar
              imageUrl={article.author.imageUrl}
              fullname="Gavin D'mello"
            />
            <a className="ms-2" href={`/main/authorId/${article.author._id}`}>
              <span className="">{"@" + article.author.username}</span>
            </a>
          </div>
          <h6
            className=" mt-2 col-12 "
            style={{
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {article.title}
          </h6>
          <span
            className=" mb-3  col-12"
            style={{ fontSize: 14, color: "#555" }}
          >
            {moment(article.created, "YYYYMMDD").fromNow()}
          </span>
        </div>
        <div className="col-4 row align-items-center justify-content-center">
          <div
            onClick={() => {}}
            className="img-fluid"
            style={{
              backgroundImage: `url(${article.imageUrl})`,
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

export default WideArticleCard;
