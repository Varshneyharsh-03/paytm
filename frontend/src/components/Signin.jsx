import React from "react";
import Heading from "../signup_signin_components/Heading";
import Subheading from "../signup_signin_components/Subheading";
import Button from "../signup_signin_components/Button";
import InputBox from "../signup_signin_components/InputBox";
import ButtonWarning from "../signup_signin_components/ButtonWarning";

const Signin = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <Subheading label={"Enter your credentials to access your account"} />
          <InputBox placeholder="harsh@gmail.com" label={"Email"} />
          <InputBox placeholder="******" label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign in"} />
          </div>
          <ButtonWarning
            label={"Don't have an account?"}
            buttontext={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
