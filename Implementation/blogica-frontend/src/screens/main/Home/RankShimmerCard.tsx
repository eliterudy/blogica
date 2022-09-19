import React from "react";
import { constants } from "../../../config/configuration";

const RankShimmerCard = () => {
  return (
    <div className=" d-flex shimmer">
      <div className="col-8 pe-4">
        <div className=" d-flex align-items-center">
          <p
            className=" col-6 shimmer-bg mt-0 mb-2 py-0"
            style={{ color: "transparent", fontSize: 10 }}
          >
            {constants.TEXT_SHIMMER_FILLER}
          </p>
        </div>

        <h3
          className=" col-11 shimmer-bg mt-0 mb-2 py-0"
          style={{ color: "transparent", fontSize: 18 }}
        >
          {`${constants.TEXT_SHIMMER_FILLER}`}
        </h3>
        <h3
          className=" col-11 shimmer-bg mt-0 mb-2 py-0"
          style={{ color: "transparent", fontSize: 18 }}
        >
          {`${constants.TEXT_SHIMMER_FILLER}`}
        </h3>
        <div className=" d-flex align-items-center">
          <p
            className=" col-8 shimmer-bg mt-0 mb-2 py-0"
            style={{ color: "transparent", fontSize: 10 }}
          >
            {constants.TEXT_SHIMMER_FILLER}
          </p>
        </div>
      </div>
      <div className="col-4 row align-items-center justify-content-center">
        <div
          className=" shimmer-bg"
          style={{
            aspectRatio: "1/1",
          }}
        ></div>
      </div>
    </div>
  );
};

export default RankShimmerCard;
