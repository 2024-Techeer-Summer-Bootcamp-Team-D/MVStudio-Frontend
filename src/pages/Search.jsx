/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styled from 'styled-components';
import LongCover from '../components/LongCover';
import { useLocation } from 'react-router-dom';

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 7rem;
`;

const SearchResult = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.1rem;
  color: #ffffff;
`;

const SearchTerm = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  font-family: 'SUIT', sans-serif;
`;

const mockItems = [
  {
    pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
    title: 'Far Post',
    uploader: '노윤하',
    view: '2255',
    options:
      '급할수록 도라에몽, 아롱하세요, 귀신이 고칼로리, 지구온나나, 지뢰 겁나다',
    owner: false,
  },
  {
    pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
    title: 'Far Post',
    uploader: '노윤하',
    view: '2255',
    options: '1111111111111, 11111111111,111111111',
    owner: false,
  },
  {
    pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
    title: 'Far Post',
    uploader: '노윤하',
    view: '2255',
    options: '1111111111111, 11111111111,111111111',
    owner: false,
  },
  {
    pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
    title: 'Far Post',
    uploader: '노윤하',
    view: '2255',
    options: '1111111111111, 11111111111,111111111',
    owner: false,
  },
  {
    pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
    title: 'Far Post',
    uploader: '노윤하',
    view: '2255',
    options: '1111111111111, 11111111111,111111111',
    owner: false,
  },
  {
    pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
    title: 'Far Post',
    uploader: '노윤하',
    view: '2255',
    options: '1111111111111, 11111111111,111111111',
    owner: false,
  },
  {
    pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
    title: 'Far Post',
    uploader: '노윤하',
    view: '2255',
    options: '1111111111111, 11111111111,111111111',
    owner: false,
  },
  {
    pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
    title: 'Far Post',
    uploader: '노윤하',
    view: '2255',
    options: '1111111111111, 11111111111,111111111',
    owner: false,
  },
  {
    pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
    title: 'Far Post',
    uploader: '노윤하',
    view: '2255',
    options: '1111111111111, 11111111111,111111111',
    owner: false,
  },
  {
    pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
    title: 'Far Post',
    uploader: '노윤하',
    view: '2255',
    options: '1111111111111, 11111111111,111111111',
    owner: false,
  },

  {
    pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
    title: 'Far Post',
    uploader: '노윤하',
    view: '2255',
    options: '1111111111111, 11111111111,111111111',
    owner: false,
  },
  {
    pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
    title: 'Far Post',
    uploader: '노윤하',
    view: '2255',
    options: '1111111111111, 11111111111,111111111',
    owner: false,
  },
  // Add more items as needed
];

function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');

  return (
    <BigContainer>
      <SearchResult>Search Result</SearchResult>
      <SearchTerm>{`'${keyword}' 검색 결과`}</SearchTerm>
      {mockItems.map((item, index) => (
        <LongCover key={index} {...item} />
      ))}
    </BigContainer>
  );
}

export default Search;
