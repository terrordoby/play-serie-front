import React from "react";

const FormGroup = (props) => {
  return (
    <div className={props.className}>
      {props.children}
      {props.error && (
        <small className="block text-sm text-red-500 mt-1 ">{props.error}</small>
      )}
    </div>
  );
};

export default FormGroup;
