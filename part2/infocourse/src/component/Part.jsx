import React from "react";

const Part = (props) => {
  const { part, exercise } = props;
  return (
    <>
      {part} {exercise}
    </>
  );
};

export default Part;
