import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { images } from "../config/configuration";

const NotFound = (props: any) => {
  const navigate = useNavigate();
  return (
    <div className=" noselect container d-flex flex-column justify-content-center align-items-center pb-5 mb-5">
      <img
        src={images.route_not_found}
        style={{ width: 300 }}
        className=" noselect mt-5 pt-5"
      />
      <span className=" noselect text-center">
        <h3>Page not found! </h3>
        <br /> <h6> You may have entered a wrong url!</h6>
      </span>
      <Button
        className=" noselect bg-success my-4"
        onClick={() => navigate("/main/home")}
      >
        Take Me Home
      </Button>
    </div>
  );
};

export default NotFound;
