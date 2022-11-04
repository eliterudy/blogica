import React from "react";
import { ArticleCardProps } from "../../../config/types";
import Generic from "../../../components/generic/GenericComponents";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const LargeArticleCard = (cardProps: ArticleCardProps) => {
  const { article, index } = cardProps;
  const navigate = useNavigate();

  return (
    <Link
      to={`/main/article/id/${article._id}`}
      state={{ articleId: article._id }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className=" noselect col-12">
        <div
          className=" noselect w-100 img-fluid center"
          style={{
            borderTopRightRadius: 4,
            borderTopLeftRadius: 4,
            objectFit: "cover",
            backgroundImage: `url(${article.image_url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            aspectRatio: "1/1",
          }}
        ></div>
        <div className=" noselect mt-3 d-flex align-items-center">
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
            className=" noselect ms-2 text-primary"
            style={{ fontWeight: "bold", fontSize: 14 }}
          >
            {`${article.author.firstname} ${article.author.lastname}`}
          </span>
        </div>
        <h3
          className=" noselect mt-2 col-12 "
          style={{
            fontSize: 32,
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
        >
          {article.title}
        </h3>
        <span
          className=" noselect mb-3  col-12"
          style={{ fontSize: 14, color: "#555" }}
        >
          {moment(article.createdAt).fromNow()}{" "}
        </span>
      </div>
    </Link>
  );
};

export default LargeArticleCard;
