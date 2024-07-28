import { create } from 'zustand'
import { user } from '../types/user'

type userStore = {
    user: user | undefined
    setUser: (userData: user | undefined) => void
}

export const useStore = create<userStore>()((set) => ({
    user: undefined,
    setUser: (userData) => set(() => ({ user: userData })),
}))
