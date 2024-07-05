import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ignorePath from '../util/igonerePath';

const Bar = styled.div`
  width: 100%;
  height: 5rem;
  color: #0e0717;
  background-color: #0e0717;
  display: flex;
  justify-content: center;
  align-items: center; /* 수직 중앙 정렬 */
`;

const Searchbar = styled.div`
  width: 60%;
  height: 60%;
  background-color: #ffffff;
  border-radius: 2rem;
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: flex-start; /* 수평 오른쪽 정렬 */
  padding-left: 0.5rem; /* 패딩 추가하여 오른쪽 정렬 시 입력상자와 가장자리 간격 확보 */
`;

const Logo = styled.div`
  position: absolute;
  left: 1rem; /* Bar의 왼쪽에 위치하도록 설정 */
  font-family: 'SUIT', sans-serif;
  font-size: 2.5rem;
  font-weight: bold; /* Bold체로 설정 */
  color: #ffffff;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 1rem;
  border: none;
  border-radius: 2rem;
  width: 100%;
  height: 90%;
  max-width: 18rem; /* 최대 너비 설정 */
`;

const Icon = styled(SearchIcon)`
  color: #000000;
`;

function Navbar() {
  const isIgnoredPath = ignorePath().includes(location.pathname);

  if (isIgnoredPath) {
    return null;
  }
  return (
    <Bar>
      <Logo>MVStudio</Logo>
      <Searchbar>
        <Icon></Icon>
        <SearchInput placeholder="Search..." />
      </Searchbar>
    </Bar>
  );
}

export default Navbar;
