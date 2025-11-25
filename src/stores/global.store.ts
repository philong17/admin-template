import { AdminInfoRESP } from '@/services/auth/auth.response';
import { create } from 'zustand';

interface GlobalState {
  userInfo: AdminInfoRESP | null;
}

interface GlobalActions {
  setUserInfo: (userInfo: AdminInfoRESP | null) => void;
}

interface GlobalStore extends GlobalState, GlobalActions {}

const initialState: GlobalState = {
  userInfo: null,
};

export const useGlobalStore = create<GlobalStore>()((set) => ({
  ...initialState,
  setUserInfo: (userInfo) => set({ userInfo }),
}));
