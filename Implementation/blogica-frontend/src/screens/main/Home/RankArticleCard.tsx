import React from "react";
import { ArticleCardProps } from "../../../config/types";
import Generic from "../../../components/generic/GenericComponents";
import { constants } from "../../../config/configuration";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

// https://picsum.photos/seed/picsum/200/300)

const RankArticleCard = (cardProps: ArticleCardProps) => {
  const { article, index } = cardProps;
  const navigate = useNavigate();

  return (
    <Link
      className="col-12  py-3 d-flex flex-row"
      to={`/main/article/id/${article._id}`}
      state={{ articleId: article._id }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <h2 className=" pe-3 " style={{ color: "#999", fontWeight: "bold" }}>
        {index + 7}
      </h2>
      <div className="">
        <div className="mt-1 col-12 ">
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
                fullname="Gavin D'mello"
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
          {moment(article.createdAt).fromNow()}
        </span>
      </div>
    </Link>
  );
};

export default RankArticleCard;
