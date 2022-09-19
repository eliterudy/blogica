import React from "react";
import { ArticleCardProps } from "../../../config/types";
import Generic from "../../../components/generic/GenericComponents";
import { constants } from "../../../config/configuration";
import moment from "moment";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

// https://picsum.photos/seed/picsum/200/300)

const LargeArticleCard = (cardProps: ArticleCardProps) => {
  const { article, index, redirect } = cardProps;
  // console.log("article?.imageUrl", article?.imageUrl);

  return article ? (
    <Link
      to={redirect}
      state={{ recipeId: article._id }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="col-12">
        <div
          className="noselect w-100 img-fluid center"
          style={{
            borderTopRightRadius: 4,
            borderTopLeftRadius: 4,
            objectFit: "cover",
            backgroundImage: `url(${article.imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            aspectRatio: "1/1",
          }}
        ></div>
        <div className=" mt-3 d-flex align-items-center">
          <Generic.Avatar imageUrl="" fullname="Gavin D'mello" />
          <a className="ms-2" href={`/main/authorId/${article.author._id}`}>
            <span className="text-primary">
              {"@" + article.author.username}
            </span>
          </a>
        </div>
        <h3
          className=" mt-2 col-12 "
          style={{ fontWeight: "bold", maxLines: 1, textOverflow: "ellipsis" }}
        >
          {article.title}
        </h3>
        <span className=" mb-3  col-12">
          {moment(article.created, "YYYYMMDD").fromNow()}
        </span>
      </div>
    </Link>
  ) : (
    <div className="col-12 shimmer">
      <h3
        className=" col-11 shimmer-bg mt-0 mb-2 py-0"
        style={{ color: "transparent", fontSize: 18 }}
      >
        {`${constants.TEXT_SHIMMER_FILLER}`}
      </h3>
      <span className=" mb-3  col-12 shimmer-bg"></span>
    </div>
    // <div className="w-100  shimmer">
    //   <div className="w-100 shimmer-bg" style={{}}></div>
    //   <div className="w-100">
    //     <div className=" mt-3">
    //       <p
    //         className=" col-5 shimmer-bg mt-0 mb-2 py-0"
    //         style={{ color: "transparent", fontSize: 10 }}
    //       >
    //         {constants.TEXT_SHIMMER_FILLER}
    //       </p>

    //       <h3
    //         className=" col-11 shimmer-bg mt-0 mb-2 py-0"
    //         style={{ color: "transparent", fontSize: 18 }}
    //       >
    //         {`${constants.TEXT_SHIMMER_FILLER}`}
    //       </h3>
    //     </div>
    //     <p
    //       className=" col-3 shimmer-bg mt-0 mb-2 py-0"
    //       style={{ color: "transparent", fontSize: 10 }}
    //     >
    //       {`.`}
    //     </p>
    //   </div>
    // </div>
  );
};

export default LargeArticleCard;
