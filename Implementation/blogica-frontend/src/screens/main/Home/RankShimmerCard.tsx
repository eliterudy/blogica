import React from "react";
import { constants } from "../../../config/configuration";

const RankShimmerCard = ({ index }: { index: number }) => {
  return (
    <div
      className=" noselect col-12  py-3  shimmer"
      style={{ textDecoration: "none", color: "black" }}
    >
      <h2
        className=" noselect pe-3 "
        style={{ color: "#999", fontWeight: "bold" }}
      >
        {index + 7}
      </h2>
      <div className=" noselect ">
        <div className=" noselect d-flex align-items-center">
          <p
            className=" noselect col-6 shimmer-bg mt-0 mb-2 py-0"
            style={{ color: "transparent", fontSize: 10 }}
          >
            {constants.TEXT_SHIMMER_FILLER}
          </p>
        </div>

        <h3
          className=" noselect col-11 shimmer-bg mt-0 mb-2 py-0"
          style={{ color: "transparent", fontSize: 18 }}
        >
          {`${constants.TEXT_SHIMMER_FILLER}`}
        </h3>
        <h3
          className=" noselect col-11 shimmer-bg mt-0 mb-2 py-0"
          style={{ color: "transparent", fontSize: 18 }}
        >
          {`${constants.TEXT_SHIMMER_FILLER}`}
        </h3>
        <div className=" noselect d-flex align-items-center">
          <p
            className=" noselect col-8 shimmer-bg mt-0 mb-2 py-0"
            style={{ color: "transparent", fontSize: 10 }}
          >
            {constants.TEXT_SHIMMER_FILLER}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RankShimmerCard;
