import create from 'zustand';
import { getUsername } from '@/api/member';

export const useUser = create((set) => ({
  username: '',
  setUsername: (name) => set({ username: name }),
  credits: 0,
  setCredits: (credits) => set({ credits: credits }),
  fetchUser: async () => {
    const data = await getUsername();
    set({ username: data.username });
    set({ credits: data.credits });
  },
}));
