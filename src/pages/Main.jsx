import React, { useState } from 'react';
import AuthInput from '../components/AuthInput';

import styled from 'styled-components';

const Backlayout = styled.div`
  background-color: #453642;
  width: 100%;
  height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function Main() {
  const [username, setUsername] = useState('');

  return (
    <Backlayout>
      <AuthInput
        title="Username"
        type="text"
        onChange={setUsername}
        value={username}
        placeholder="아이디를 입력해 주세요"
      />
    </Backlayout>
  );
}

export default Main;
