"use client";

import { HandleSignOut } from "@/src/_actions/signOutAction";

export const SignOutButton = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={props.className}
      style={{ cursor: "pointer" }}
      onClick={() => HandleSignOut()}
    >
      {props.children || "Sign Out"}
    </button>
  );
};