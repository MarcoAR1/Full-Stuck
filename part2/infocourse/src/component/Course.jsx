import React from "react";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((e) => {
        return (
          <div key={e.id}>
            <Header name={e.name} />
            <Content parts={e.parts} />
            <Total parts={e.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;
