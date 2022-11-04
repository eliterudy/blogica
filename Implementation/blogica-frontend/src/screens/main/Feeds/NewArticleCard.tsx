import React from "react";
import { Input } from "reactstrap";
import Generic from "../../../components/generic/GenericComponents";
import { constants } from "../../../config/configuration";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// https://picsum.photos/seed/picsum/200/300)

const NewArticleCard = (cardProps: any) => {
  const state = useSelector((state: any) => {
    return {
      userState: state.userActionReducer,
    };
  });
  const { user } = state.userState;

  return (
    <Link
      to={`/main/article/new`}
      className=" noselect d-flex flex-column align-items-center  mt-3 p-4"
      style={{
        textDecoration: "none",
        color: "black",
        border: "0.1px solid #ddd",
        borderRadius: 5,
      }}
    >
      <p className=" noselect subMessages " style={{ fontSize: 14 }}>
        {constants.NEW_ARTICLE_NOTES}
      </p>

      <div className=" noselect col-12 d-flex flex-row">
        <div className=" noselect me-2">
          {user && (
            <Generic.Avatar
              image_url={user.image_url}
              fullname={`${user.firstname} ${user.lastname}`}
              size={40}
            />
          )}
        </div>
        <div style={{ flex: 1 }} className=" noselect px-2">
          <Input
            type="text"
            name="new"
            className=" noselect py-2 bg-white cursorPointer"
            value={"What is on your mind? "}
            disabled
          />
        </div>
      </div>
    </Link>
  );
};

export default NewArticleCard;
