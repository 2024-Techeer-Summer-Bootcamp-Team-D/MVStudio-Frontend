import React from 'react';
import { useNavigate } from 'react-router-dom';
import ignorePath from '../utils/igonerePath';
import styled, { keyframes } from 'styled-components';

// Material-UI
import SearchIcon from '@mui/icons-material/Search';

const BackLayout = styled.div`
  width: 100%;
  height: 5rem;
  /* background-color: #05000a; */
  display: flex;
  justify-content: center;
  align-items: center; /* 수직 중앙 정렬 */
  border-bottom: 1px solid #1e003b;
  z-index: 3;
  position: fixed;
`;

const BackLayoutSpace = styled.div`
  width: 100%;
  height: 5rem;
`;

const Searchbar = styled.div`
  width: 50%;
  height: 45%;
  background-color: white;
  border-radius: 0.75rem;
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  padding-left: 0.5rem; /* 패딩 추가하여 오른쪽 정렬 시 입력상자와 가장자리 간격 확보 */
`;

const shakeAnimation = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(8deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-8deg); }
  100% { transform: rotate(0deg); }
`;

const Logo = styled.div`
  position: absolute;
  left: 2rem;
  font-family: 'SUIT', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.5s;

  &:hover {
    img {
      transform: scale(1.1);
      animation: ${shakeAnimation} 0.8s infinite;
    }
  }
`;

const LogoImage = styled.img`
  height: 1.5rem;
  margin-right: 0.5rem;
  transition: transform 0.5s;
`;

const SearchInput = styled.input`
  background-color: white;
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
    <>
      <BackLayoutSpace />
      <BackLayout>
        <Logo onClick={() => navigate('/main')}>
          <LogoImage src="https://mvstudio-bucket.s3.ap-northeast-2.amazonaws.com/static_image/logo_image/MVStudio_backgroundless.png" />
          MVStudio
        </Logo>
        <Searchbar>
          <Icon />
          <SearchInput
            placeholder="Search..."
            onKeyDown={handleSearch} // 검색어 입력 시 이벤트 핸들러 추가
          />
        </Searchbar>
      </BackLayout>
    </>
  );
}

export default Navbar;
