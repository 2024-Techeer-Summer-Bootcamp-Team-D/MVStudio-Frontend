import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

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
  width: 18rem;
  height: 60%;
  background-color: #ffffff;
  border-radius: 2rem;
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: flex-start; /* 수평 오른쪽 정렬 */
  padding-left: 0.5rem; /* 패딩 추가하여 오른쪽 정렬 시 입력상자와 가장자리 간격 확보 */
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
  return (
    <Bar>
      <Searchbar>
        <Icon></Icon>
        <SearchInput placeholder="Search..." />
      </Searchbar>
    </Bar>
  );
}

export default Navbar;
