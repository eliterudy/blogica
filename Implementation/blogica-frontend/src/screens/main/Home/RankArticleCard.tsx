import React from "react";
import { ArticleCardProps } from "../../../config/types";
import Generic from "../../../components/generic/GenericComponents";
import { constants } from "../../../config/configuration";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

// https://picsum.photos/seed/picsum/200/300)

const RankArticleCard = (cardProps: ArticleCardProps) => {
  const { article, index, redirect } = cardProps;
  return (
    <Link
      className="col-12  py-3 d-flex flex-row"
      to={redirect}
      state={{ recipeId: article._id }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <h2 className=" pe-3 " style={{ color: "#999", fontWeight: "bold" }}>
        {index + 6}
      </h2>
      <div className="">
        <div className="mt-1 col-12 ">
          <Generic.Avatar imageUrl="" fullname="Gavin D'mello" />
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
        <span className=" mb-3  col-12" style={{ fontSize: 14, color: "#555" }}>
          {moment(article.created, "YYYYMMDD").fromNow()}
        </span>
      </div>
    </Link>
  );
};

export default RankArticleCard;
