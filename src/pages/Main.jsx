import React, { useState } from 'react';
import AuthInput from '../components/AuthInput';
import Authframe from '../components/Authframe';
import styled from 'styled-components';
import LongCover from '../components/LongCover';

const Backlayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function Main() {
  const [username, setUsername] = useState('');
  const albumCoverArray = [
    {
      pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
      title: 'viego',
      uploader: 'Clid',
      view: '1210',
      options:
        'K-POP, Korean, Female, Electric guitar, Normal,급할수록 도라에몽, 방야방얍앙야',
      owner: false,
    },
    {
      pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
      title: 'Viego',
      uploader: 'Clid',
      view: '1210',
      options:
        'K-POP, Korean, Female, Electric guitar, Normal,급할수록 도라에몽, 방야방얍앙야',
      owner: true,
    },
  ];

  return <Backlayout></Backlayout>;
}

export default Main;
