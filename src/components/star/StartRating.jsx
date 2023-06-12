import React, { useState } from "react";
import Star from "./Star";

const StarRating = () => {
  const [activeIndex, setActiveIndex] = useState();

  const handleStarClick = (index) => {
    setActiveIndex(index);
  };

  const items = [...new Array(5).keys()];

  return (
    <div>
      {items.map((index) => (
        <Star
          key={`${index}--index`}
          active={index <= activeIndex}
          onClick={() => handleStarClick(index)}
        />
      ))}
    </div>
  );
};

export default StarRating;
