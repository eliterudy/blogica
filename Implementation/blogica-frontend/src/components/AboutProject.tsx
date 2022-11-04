import React from "react";
import { constants } from "../config/configuration";

const AboutProjectCard = () => {
  return (
    <div
      className=" noselect p-4  "
      style={{ backgroundColor: "#ECDBBA", borderRadius: 5 }}
    >
      <div className=" noselect w-100 d-flex mb-4 flex-row align-items-center">
        <i className=" noselect mr-3 fa  fa-anchor fa-lg me-2" />
        <div>
          <h3 className=" noselect m-0" style={{ fontWeight: "bold" }}>
            About {constants.APP_NAME}
          </h3>
        </div>
      </div>
      <div className=" noselect w-100 pb-6">
        <p className=" noselect ">
          {constants.APP_NAME} is a mobile-responsive web application, that acts
          as a platform where you can interact with and read articles published
          by article writers. Explore thousands of articles based on Culture and
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
        <div className=" noselect btn mt-2  py-2 px-3 bg-black text-white rounded">
          ✨ Star on GitHub
        </div>
      </a>
    </div>
  );
};

export default AboutProjectCard;
