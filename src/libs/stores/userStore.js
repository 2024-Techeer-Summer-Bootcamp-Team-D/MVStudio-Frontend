/* eslint-disable no-undef */
import create from 'zustand';
import { getUsername } from '@/api/member';
import { reissueToken } from '@/api/axios.config';
import { setCookie } from '@/utils/cookies';

export const useUser = create((set) => ({
  username: '',
  setUsername: (username) => set({ username }),
  credits: 0,
  setCredits: (credits) => set({ credits }),
  tokenReissued: false,
  fetchUser: async () => {
    try {
      const data = await getUsername();
      if (data && typeof data.username !== 'undefined') {
        set({ username: data.username, credits: data.credits || 0 });
      } else {
        await reissueToken().then((newAccessToken) => {
          if (newAccessToken) {
            setCookie('accessToken', newAccessToken);
            window.location.reload();
          }
        });
      }
    } catch (error) {
      console.log('사용자 데이터 가져오기 오류:', error);
    }
  },
}));
