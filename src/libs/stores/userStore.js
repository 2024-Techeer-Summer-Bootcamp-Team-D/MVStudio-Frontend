import create from 'zustand';
import { getUsername } from '@/api/member';

export const useUser = create((set) => ({
  username: '',
  credits: 0,
  fetchUser: async () => {
    const data = await getUsername();
    set({ username: data.username });
    set({ credits: data.credits });
  },
}));
