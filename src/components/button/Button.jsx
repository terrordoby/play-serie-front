import React from "react";

const Button = (props) => {
  return (
    <button disabled={!props.isValid} onClick={props.onClick} type={props.type || "button"} className={`bg-[#CC3434] px-1 py-4
    rounded-md text-center text-white w-full font-medium text-xl hover:bg-[#c22525] transition active:bg-[#c22525] ${props.isValid ? "" : "cursor-not-allowed opacity-70"}`}>{props.children}</button>
  );
};

export default Button;
