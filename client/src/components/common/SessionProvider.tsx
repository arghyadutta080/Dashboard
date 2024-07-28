"use client";

import React, { useCallback, useEffect } from "react";
import { useStore } from "@/lib/store/user";
import { useAuthStore } from "@/lib/store/authState";

type SessionProviderProps = {
  profile: any;
};

const SessionProvider: React.FC<SessionProviderProps> = ({ profile }) => {
  const { user, setUser } = useStore((state) => ({    // useStore from Zustand custom store
    user: state.user,
    setUser: state.setUser,
  }));

  const { auth } = useAuthStore((state) => ({
    auth: state.auth,
  }));

  const userProfile = useCallback(async () => {
    const user = await profile();
    setUser(user);    // user state update by setUser from Zustand custom store
  }, [user]);

  useEffect(() => {
    userProfile();
  }, [auth]);

  return <></>;
};

export default SessionProvider;
