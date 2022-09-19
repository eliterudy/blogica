import React, { useState, useRef, useEffect } from "react";

import { gifs } from "../../config/configuration";
import { randomColorGenerator } from "../../utils/generic";
import Avatar from "react-avatar";

const avatarColor = randomColorGenerator();

const Generic = {
  Loader: ({ message }: { message: String }) => {
    return (
      <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
        <img src={gifs.loader} alt="loader" style={{ width: 60, height: 60 }} />
        <span>{message}</span>
      </div>
    );
  },
  Avatar: ({ imageUrl, fullname }: { imageUrl: string; fullname: string }) => {
    return (
      <Avatar
        size="25"
        round="25px"
        src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3"
        name="Wim Mostmans"
      />
    );
  },
};

export default Generic;
