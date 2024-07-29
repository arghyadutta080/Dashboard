"use client";

import React, { useCallback, useEffect } from "react";
import { useStore } from "@/lib/store/user";
import { useAuthStore } from "@/lib/store/authState";
import { getUserProfile } from "@/api/auth/userProfile";


const SessionProvider: React.FC = () => {
  const { user, setUser } = useStore((state) => ({    // useStore from Zustand custom store
    user: state.user,
    setUser: state.setUser,
  }));

  const { auth } = useAuthStore((state) => ({
    auth: state.auth,
  }));

  const userProfile = useCallback(async () => {
    try {
      if (user === undefined) {
        const userInfo = await getUserProfile();
        setUser(userInfo);    // user state update by setUser from Zustand custom store
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);
  
  console.log("Session provider running ...")
  console.log("In SessionProvider", user)

  useEffect(() => {
    userProfile();
  }, [auth]);

  return <></>;
};

export default SessionProvider;
