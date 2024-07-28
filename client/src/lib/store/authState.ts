import { create } from "zustand"

type authStateStore = {
    auth: boolean
    setAuth: (authState: boolean) => void
}

export const useAuthStore = create<authStateStore>((set) => ({
    auth: false,
    setAuth: (authState) => set(() => ({ auth: authState })),
}))