import React from "react";
import { constants } from "../../../config/configuration";

const WideShimmerCard = () => {
  return (
    <div className=" noselect      d-flex shimmer">
      <div className=" noselect col-8 pe-4">
        <div className=" noselect      d-flex align-items-center">
          <p
            className=" noselect      col-6 shimmer-bg mt-0 mb-2 py-0"
            style={{ color: "transparent", fontSize: 10 }}
          >
            {constants.TEXT_SHIMMER_FILLER}
          </p>
        </div>

        <h3
          className=" noselect      col-11 shimmer-bg mt-0 mb-2 py-0"
          style={{ color: "transparent", fontSize: 18 }}
        >
          {`${constants.TEXT_SHIMMER_FILLER}`}
        </h3>
        <h3
          className=" noselect      col-11 shimmer-bg mt-0 mb-2 py-0"
          style={{ color: "transparent", fontSize: 18 }}
        >
          {`${constants.TEXT_SHIMMER_FILLER}`}
        </h3>
        <div className=" noselect      d-flex align-items-center">
          <p
            className=" noselect      col-8 shimmer-bg mt-0 mb-2 py-0"
            style={{ color: "transparent", fontSize: 10 }}
          >
            {constants.TEXT_SHIMMER_FILLER}
          </p>
        </div>
      </div>
      <div className=" noselect col-4 row align-items-center justify-content-center">
        <div
          className=" noselect      shimmer-bg"
          style={{
            aspectRatio: "1/1",
          }}
        ></div>
      </div>
    </div>
  );
};

export default WideShimmerCard;
