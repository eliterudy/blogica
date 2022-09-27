import React from "react";
import { ArticleCardProps } from "../config/types";
import Generic from "./generic/GenericComponents";
import { constants } from "../config/configuration";
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

const AboutProjectCard = () => {
  // console.log("article?.image_url", article?.image_url);

  return (
    <div
      className="p-4  "
      style={{ backgroundColor: "#ECDBBA", borderRadius: 5 }}
    >
      <div className="w-100 d-flex mb-4 flex-row align-items-center">
        <i className="mr-3 fa  fa-anchor fa-lg me-2" />
        <div>
          <h3 className="m-0" style={{ fontWeight: "bold" }}>
            About Blogica
          </h3>
        </div>
      </div>
      <div className="w-100 pb-6">
        <p className="">
          Blogica is a mobile-responsive web application, that acts as a
          platform where you can interact with and read articles published by
          article writers. Explore thousands of articles based on Culture and
          Civilization, Defence and Security, Science and Technology, Stories,
          Essays and other similar categories today.
          <br />
          <br />
          Wish to become a content creator. Sign up today and start writing your
          own articles
          <br />
          <br />I hope you enjoy this project! Feel free to suggest any features
          or report bugs on GitHub.
        </p>
      </div>

      <a href={"https://github.com/GavinDmello97/blogica"}>
        <div className=" btn mt-2  py-2 px-3 bg-black text-white rounded">
          ✨ Star on GitHub
        </div>
      </a>
    </div>
  );
};

export default AboutProjectCard;
