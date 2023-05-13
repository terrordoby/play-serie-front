import React from "react";

const Button = (props) => {
  return (
    <button className="bg-[#CC3434] px-1 py-4
    rounded-md text-white w-full font-medium text-xl hover:bg-[#c22525] transition active:bg-[#c22525]">{props.children}</button>
  );
};

export default Button;
