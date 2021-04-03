import React from "react";

const Total = ({ course }) => {
  const { parts } = course;
  return (
    <p>Number of exercises {parts.reduce((i, x) => i + x.exercises, 0)}</p>
  );
};

export default Total;
