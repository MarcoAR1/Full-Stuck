import React from "react";

const Statistics = ({ text, value }) => {
  return (
    <tr>
      <td> {text}</td>
      <td> {value}</td>
    </tr>
  );
};

export default Statistics;
