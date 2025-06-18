import React from "react";
import Heading from "../signup_signin_components/Heading";
import Subheading from "../signup_signin_components/Subheading";
import Button from "../signup_signin_components/Button";
import InputBox from "../signup_signin_components/InputBox";
import ButtonWarning from "../signup_signin_components/ButtonWarning";

const Signup = () => {
  return (
    <div className="bg-slate-300 flex h-screen justify-center w-screen flex items-center justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"}></Heading>
          <Subheading
            label={"Enter your information to create an account"}
          ></Subheading>
          <InputBox label={"First Name"} placeholder={"Harsh"}></InputBox>
          <InputBox label={"Last Name"} placeholder={"Varshney"}></InputBox>
          <InputBox label={"Email"} placeholder={"harsh@gmail.com"}></InputBox>
          <InputBox label={"Phone"} placeholder={"98211399**"}></InputBox>

          <div className="pt-4">
            <Button label={"Sign Up"}></Button>
          </div>
          <ButtonWarning
            label={"Already have and account?"}
            buttontext={"Sign In"}
            to={"/signin"}
          ></ButtonWarning>
        </div>
      </div>
    </div>
  );
};

export default Signup;
