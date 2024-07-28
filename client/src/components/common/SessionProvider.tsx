"use client";

import React, { useEffect } from "react";
import { useStore } from "@/lib/store/user";
import { useAuthStore } from "@/lib/store/authState";

type SessionProviderProps = {
  profile: any;
};

const SessionProvider: React.FC<SessionProviderProps> = ({ profile }) => {
  const { setUser } = useStore((state) => ({
    // useStore from Zustand custom store
    setUser: state.setUser,
  }));

  const { auth } = useAuthStore((state) => ({
    auth: state.auth,
  }));

  const userProfile = async () => {
    const user = await profile();
    setUser(user); // user state update by setUser from Zustand custom store
  };

  useEffect(() => {
    userProfile();
  }, [auth]);

  return <></>;
};

export default SessionProvider;
