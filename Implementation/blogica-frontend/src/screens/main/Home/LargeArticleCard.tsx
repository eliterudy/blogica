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
  const { article, index } = cardProps;
  const navigate = useNavigate();

  return (
    <Link
      to={`/main/article/id/${article._id}`}
      state={{ articleId: article._id }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className=" col-12">
        <div
          className="      w-100 img-fluid center"
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
        <div className="      mt-3 d-flex align-items-center">
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
            className="      ms-2 text-primary"
            style={{ fontWeight: "bold", fontSize: 14 }}
          >
            {`${article.author.firstname} ${article.author.lastname}`}
          </span>
        </div>
        <h3
          className="      mt-2 col-12 "
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
          className="      mb-3  col-12"
          style={{ fontSize: 14, color: "#555" }}
        >
          {moment(article.createdAt).fromNow()}{" "}
        </span>
      </div>
    </Link>
  );
};

export default LargeArticleCard;
