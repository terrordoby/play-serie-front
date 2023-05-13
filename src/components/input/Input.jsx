import React from "react";

const Input = (props) => {
  return (
    <input
      type={props.type || "text"}
      value={props.value}
      className="bg-red-500"
      onChange={props.onChange}>
      {props.label}
    </input>
  );
};

export default Input;
