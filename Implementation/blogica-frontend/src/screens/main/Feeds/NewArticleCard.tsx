import React from "react";
import { InputGroup, Input, Button } from "reactstrap";
import { ArticleCardProps } from "../../../config/types";
import Generic from "../../../components/generic/GenericComponents";
import { constants } from "../../../config/configuration";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// https://picsum.photos/seed/picsum/200/300)

const NewArticleCard = (cardProps: any) => {
  const navigate = useNavigate();
  const state = useSelector((state: any) => {
    return {
      userState: state.userActionReducer,
    };
  });
  const { user } = state.userState;

  return (
    <Link
      to={`/main/article/new`}
      className=" d-flex flex-column align-items-center m-2 mt-3 p-3"
      style={{
        textDecoration: "none",
        color: "black",
        border: "0.1px solid #ddd",
        borderRadius: 5,
      }}
    >
      <p className="subMessages " style={{ fontSize: 14 }}>
        {constants.NEW_ARTICLE_NOTES}
      </p>

      <div className="col-12 d-flex flex-row">
        <div className="me-2">
          <Generic.Avatar
            image_url={user.image_url}
            fullname={`${user.firstname} ${user.lastname}`}
            size={40}
          />
        </div>
        <div style={{ flex: 1 }} className="px-2">
          <Input
            type="text"
            name="new"
            className="py-2 bg-white"
            value={"What is on your mind? "}
            disabled
          />
        </div>
      </div>
    </Link>
  );
};

export default NewArticleCard;
