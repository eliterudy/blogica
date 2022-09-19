import React from "react";
import { ArticleCardProps } from "../../../config/types";
import Generic from "../../../components/generic/GenericComponents";
import { constants } from "../../../config/configuration";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

// https://picsum.photos/seed/picsum/200/300)

const WideArticleCard = (cardProps: ArticleCardProps) => {
  const { article, index, redirect } = cardProps;
  return article ? (
    <Link
      to={redirect}
      state={{ recipeId: article._id }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className=" d-flex ">
        <div className="col-8 pe-4">
          <div className="mt-3 d-flex flex-row align-items-center">
            <Generic.Avatar imageUrl="" fullname="Gavin D'mello" />
            <a className="ms-2" href={`/main/authorId/${article.author._id}`}>
              <span className="">{"@" + article.author.username}</span>
            </a>
          </div>
          <h6
            className=" mt-2 col-12 "
            style={{
              fontWeight: "bold",
              flexWrap: "wrap",
            }}
          >
            {article.title}
          </h6>
          <span className=" mb-3 col-12" style={{ color: "#444" }}>
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
  ) : (
    <div className=" d-flex shimmer">
      <div className="col-8 pe-4">
        <div className=" mt-3">
          <p
            className=" col-5 shimmer-bg mt-0 mb-2 py-0"
            style={{ color: "transparent", fontSize: 10 }}
          >
            {constants.TEXT_SHIMMER_FILLER}
          </p>

          <h3
            className=" col-11 shimmer-bg mt-0 mb-2 py-0"
            style={{ color: "transparent", fontSize: 18 }}
          >
            {`${constants.TEXT_SHIMMER_FILLER}`}
          </h3>
          <h3
            className=" col-11 shimmer-bg mt-0 mb-2 py-0"
            style={{ color: "transparent", fontSize: 18 }}
          >
            {`${constants.TEXT_SHIMMER_FILLER}`}
          </h3>
          <p
            className=" col-5 shimmer-bg mt-0 mb-2 py-0"
            style={{ color: "transparent", fontSize: 10 }}
          >
            {constants.TEXT_SHIMMER_FILLER}
          </p>
        </div>
      </div>
      <div className="col-4 row align-items-center justify-content-center">
        <div
          className=" shimmer-bg"
          style={{
            aspectRatio: "1/1",
          }}
        ></div>
      </div>
    </div>
  );
};

export default WideArticleCard;
