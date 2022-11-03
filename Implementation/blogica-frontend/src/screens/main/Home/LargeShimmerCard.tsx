import React from "react";
import { constants } from "../../../config/configuration";

const LargeShimmerCard = () => (
  <div className="col-12 shimmer">
    <div
      className=" w-100 img-fluid center shimmer-bg"
      style={{
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        objectFit: "cover",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        aspectRatio: "1/1",
      }}
    ></div>
    <div className=" mt-3 d-flex align-items-center">
      <p
        className=" col-5 shimmer-bg mt-0 mb-2 py-0"
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
);
export default LargeShimmerCard;
