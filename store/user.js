import { create } from "zustand";



const initialUser = { "isSigned": false, "nickname": '' }

export const useStore = create((set, get) => ({

    user: initialUser,
    setUser: (state) => set((prev) => ({ user: { ...prev.user, ...state } })),
    resetUser: () => set({ user: initialUser }),

}))