import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  left: 1rem;
  font-family: 'SUIT', sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
`;

const SearchInput = styled.input`
  font-size: 1rem;
  border-radius: 2rem;
  width: 100%;
  height: 85%;
  outline: none;
  border: none;
`;

const Icon = styled(SearchIcon)`
  color: #000000;
`;

function Navbar() {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const keyword = event.target.value.trim();
      if (keyword) {
        navigate(`/search?keyword=${keyword}`); // 검색어와 함께 URL 이동
      }
    }
  };

  const isIgnoredPath = ignorePath().includes(window.location.pathname);

  if (isIgnoredPath) {
    return null;
  }

  return (
    <Bar>
      <Logo>MVStudio</Logo>
      <Searchbar>
        <Icon />
        <SearchInput
          placeholder="Search..."
          onKeyDown={handleSearch} // 검색어 입력 시 이벤트 핸들러 추가
        />
      </Searchbar>
    </Bar>
  );
}

export default Navbar;
