import React from "react";

const Container = (props) => {
  return (
    <div className=" bg-[#cc3434] w-screen h-screen flex flex-col items-center justify-center">{props.children}</div>
  );
};

export default Container;
