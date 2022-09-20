import React from "react";
import { constants } from "../../../config/configuration";

const RankShimmerCard = ({ index }: { index: number }) => {
  return (
    <div
      className="col-12  py-3  shimmer"
      style={{ textDecoration: "none", color: "black" }}
    >
      <h2 className=" pe-3 " style={{ color: "#999", fontWeight: "bold" }}>
        {index + 6}
      </h2>
      <div className="">
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
    </div>
  );
};

export default RankShimmerCard;
