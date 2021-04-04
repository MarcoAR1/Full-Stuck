import React from "react";

const Total = ({ parts }) => {
  return (
    <p>
      <strong>
        Total of {parts.reduce((i, x) => i + x.exercises, 0)} exercises
      </strong>
    </p>
  );
};

export default Total;
