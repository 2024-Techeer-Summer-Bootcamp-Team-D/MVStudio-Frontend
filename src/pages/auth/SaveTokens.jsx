import React, { useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { setCookie, removeCookie } from '@/utils/cookies';

function SaveTokens() {
  const { loginType: loginType } = useParams();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('accessToken');

  useEffect(() => {
    if (accessToken) {
      setCookie('accessToken', accessToken);
      console.log('loginType:', loginType);
      if (loginType === 'login') {
        navigate('/main');
        return;
      } else if (loginType === 'signup') {
        navigate('/onboarding');
        return;
      } else {
        removeCookie('accessToken');
        navigate('/auth');
      }
    } else {
      navigate('/auth');
    }
  }, []);

  return <div>로그인 중...</div>;
}

export default SaveTokens;
