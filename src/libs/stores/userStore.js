import create from 'zustand';
import { getUsername } from '@/api/member';

export const useUser = create((set) => ({
  username: '',
  setUsername: (username) => set({ username }),
  credits: 0,
  setCredits: (credits) => set({ credits }),
  fetchUser: async () => {
    try {
      const data = await getUsername();
      if (data && typeof data.username !== 'undefined') {
        set({ username: data.username, credits: data.credits || 0 });
      } else {
        console.warn('유효하지 않은 사용자 데이터:', data);
      }
    } catch (error) {
      console.error('사용자 데이터 가져오기 오류:', error);
    }
  },
}));
