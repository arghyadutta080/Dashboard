import React from "react";
import SessionProvider from "./SessionProvider";
import { getUserProfile } from "@/api/auth/userProfile";

const SessionServerProvider = () => {
  const userProfile = async () => {
    "use server";
    try {
      const user = await getUserProfile();
      return user;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      <SessionProvider profile={userProfile}/>{" "}
    </>
  );
};

export default SessionServerProvider;
