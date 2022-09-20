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

  return (
    <Link
      to={redirect}
      state={{ recipeId: article._id }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="col-12">
        <div
          className=" w-100 img-fluid center"
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
          <Generic.Avatar
            imageUrl={article.author.imageUrl}
            fullname="Gavin D'mello"
          />
          <a className="ms-2" href={`/main/authorId/${article.author._id}`}>
            <span
              className="text-primary"
              style={{ fontWeight: "bold", fontSize: 14 }}
            >
              {"@" + article.author.username}
            </span>
          </a>
        </div>
        <h3
          className=" mt-2 col-12 "
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
        <span className=" mb-3  col-12" style={{ fontSize: 14, color: "#555" }}>
          {moment(article.created, "YYYYMMDD").fromNow()}
        </span>
      </div>
    </Link>
  );
};

export default LargeArticleCard;
