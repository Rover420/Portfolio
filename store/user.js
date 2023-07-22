import { create } from "zustand";
import { io } from "socket.io-client";


const initialUser = { "isSigned": false, "nickname": '' }

export const useStore = create((set, get) => ({

    user: initialUser,
    setUser: (state) => set((prev) => ({ user: { ...prev.user, ...state } })),
    resetUser: () => set({ user: initialUser }),

    publicKey: '',
    setPublicKey: (state) => set(() => ({ publicKey: state })),

    privateKey: '',
    setPrivateKey: (state) => set(() => ({ privateKey: state })),

    socket: null,
    connect: () => {
        const { socket } = get();
        if(!socket) {
            const socket = io(process.env.NEXT_PUBLIC_WS_CONN, { reconnectionAttempts: 3, reconnectionDelayMax: 10000 });
            set({ socket });
        }
    },
    disconnect: () => {
        const { socket } = get();
        if (socket) {
          socket.disconnect();
          set({ socket: null });
        }
    },

}))