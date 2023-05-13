import React from "react";

const Wrapper = (props) => {
  return (
    <div className="bg-[#FDECEC] rounded-lg flex items-center flex-col w-[300px] md:w-[400px] p-7 gap-2">{props.children}</div>
  );
};

export default Wrapper;
