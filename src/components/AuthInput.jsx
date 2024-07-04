/* eslint-disable react/prop-types */
import React from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import styled from 'styled-components';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const Backlayout = styled.div`
  display: flex;
  flex-direction: column;
`;
const Body = styled.div`
  background: linear-gradient(
    145deg,
    rgba(250, 242, 255, 0.15),
    rgba(230, 230, 250, 0.1)
  );
  width: 39.25rem;
  height: 3rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #a4a4a4;
  margin-bottom: 2rem;
`;

const Title = styled.div`
  color: #a4a4a4;
  font-size: 1rem;
`;

const PersonIcon = styled(PersonOutlineIcon)`
  color: #a4a4a4;
`;

const KeyIcon = styled(VpnKeyIcon)`
  color: #a4a4a4;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  color: white;
  background-color: transparent;
  font-size: 1rem;
  margin-left: 1rem;
  &:focus {
    outline: none;
  }
`;

function AuthInput({ title, type, placeholder, onChange, value }) {
  return (
    <Backlayout>
      <Title>{title}</Title>
      <Body>
        {type === 'text' ? (
          <PersonIcon fontSize="large" />
        ) : (
          <KeyIcon fontSize="large" />
        )}

        <Input
          type={type}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      </Body>
    </Backlayout>
  );
}

export default AuthInput;
