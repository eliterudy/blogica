import React from "react";
import { constants } from "../../../config/configuration";

const LargeShimmerCard = () => (
  <div className=" noselect col-12 shimmer">
    <div
      className=" noselect      w-100 img-fluid center shimmer-bg"
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
    <div className=" noselect      mt-3 d-flex align-items-center">
      <p
        className=" noselect      col-5 shimmer-bg mt-0 mb-2 py-0"
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
);
export default LargeShimmerCard;
