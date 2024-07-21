import create from 'zustand';
import { getUsername } from '@/api/member';

export const useUser = create((set) => ({
  username: '',
  setUsername: (name) => set({ username: name }),
  fetchUsername: async () => {
    const data = await getUsername();
    set({ username: data.username });
  },
}));
