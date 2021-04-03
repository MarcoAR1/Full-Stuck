import React from "react";

const Part = (props) => {
  const { part, exercise } = props;
  return (
    <div>
      {part} {exercise}
    </div>
  );
};

export default Part;
