"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useStore } from "@/lib/store/user";
import { getUserProfile } from "@/api/auth/userProfile";


const SessionProvider: React.FC = () => {
  const { user, setUser } = useStore((state) => ({    // useStore from Zustand custom store
    user: state.user,
    setUser: state.setUser,
  }));

  const dataFetchedRef = useRef(false);

  const userProfile = useCallback(async () => {   // useCallback to prevent multiple calls by useEffect during rendering until the global user state is updated
    try {
      const userInfo = await getUserProfile();
      setUser(userInfo);    // user state update by setUser from Zustand custom store
    } catch (error) {
      console.log(error);
    }
  }, [user]);  
  
  console.log("Session provider running ...")
  console.log("In SessionProvider", user)

  useEffect(() => {
    if (!dataFetchedRef.current) {    // check with useRef to prevent multiple calls by useEffect
      dataFetchedRef.current = true;
      userProfile();
    }
  }, []);   // useEffect dependency on auth state, which changes on login/logout

  return <></>;
};

export default SessionProvider;
