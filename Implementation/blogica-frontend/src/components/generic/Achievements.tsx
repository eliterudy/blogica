/* package inports */

import React from "react";

import { Col, Row } from "reactstrap";

/* component/screen inports */

/* helper imports */
import { Award } from "../../config/types";
import Generic from "../../components/generic/GenericComponents";

const Achievements = ({ badges }: any) => {
  return (
    <Row className=" noselect border-top py-3">
      <h5
        style={{
          overflowWrap: "break-word",
          margin: 0,
        }}
      >
        Achievements
      </h5>
      <Col className=" noselect mt-1 d-flex flex-wrap">
        {badges.map((badge: Award, index: number) => {
          return (
            <Generic.Achievement
              {...badge}
              size={50}
              key={index}
              index={index}
            />
          );
        })}
      </Col>
    </Row>
  );
};

export default Achievements;
