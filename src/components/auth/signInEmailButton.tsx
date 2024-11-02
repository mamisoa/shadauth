"use client";

import { handleEmailSignIn } from "@/src/_actions/emailSigninAction";
import { MdOutlineMarkEmailRead } from "react-icons/md";


export const SignInEmailButton = (props: {
  children?: React.ReactNode;
  className?: string;
  email: string;
}) => {
  const defaultClassName = "flex items-center justify-center w-full bg-white text-black p-2 rounded-md border hover:bg-gray-100 mb-2";

  return (
    <button
      className={props.className || defaultClassName}
      style={{ cursor: "pointer" }}
      onClick={() => handleEmailSignIn(props.email)}
    >
      <MdOutlineMarkEmailRead className="bg-white w-5 h-5 mr-2" />
      {props.children || "Sign in with a magic email link"}
    </button>
  );
};
