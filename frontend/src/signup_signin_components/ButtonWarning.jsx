import React from "react";
import { Link } from "react-router-dom";
const ButtonWarning = ({ label, buttontext, to }) => {
  return (
    <div className="flex justify-center text-sm py-2">
      <div>{label}</div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttontext}
      </Link>
    </div>
  );
};

export default ButtonWarning;
