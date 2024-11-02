"use client";

import { handleGoogleSignIn } from "@/src/_actions/googleSigninAction";
import { FcGoogle } from "react-icons/fc";

export const SignInGoogleButton = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const defaultClassName = "flex items-center justify-center w-full bg-white text-black p-2 rounded-md border hover:bg-gray-100 mb-2";

  return (
    <button
      className={props.className || defaultClassName}
      style={{ cursor: "pointer" }}
      onClick={() => handleGoogleSignIn()}
    >
      <FcGoogle className="bg-white w-5 h-5 mr-2" />
      {props.children || "Sign in with Google"}
    </button>
  );
};
