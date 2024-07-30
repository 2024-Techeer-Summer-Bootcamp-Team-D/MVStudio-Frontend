import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { patchMemberInfo } from '@/api/member';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/libs/stores/userStore';
import Swal from 'sweetalert2';

function YtChannelRegister() {
  const location = useLocation();
  const ytChannelURL = new URLSearchParams(location.search).get('youtube_url');
  const navigate = useNavigate();
  const username = useUser((state) => state.username);

  useEffect(() => {
    console.log('channel url: ', ytChannelURL);
    console.log('username: ', username);
    if (ytChannelURL && username) {
      patchMemberInfo(
        username,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        ytChannelURL,
        null,
      ).then(() => {
        navigate(`/users/${username}`);
        Swal.fire({
          icon: 'success',
          text: '유튜브 채널 등록이 완료되었습니다.',
          showConfirmButton: true,
          confirmButtonText: '확인',
        });
      });
    } else {
      // window.location.reload();
    }
  }, [username, ytChannelURL]);

  return <div>등록중입니다...</div>;
}

export default YtChannelRegister;
