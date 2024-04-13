import React from "react";

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p style={{ fontWeight: "bold" }}>
      Number of exercices in course : {total}
    </p>
  );
};

export default Total;
