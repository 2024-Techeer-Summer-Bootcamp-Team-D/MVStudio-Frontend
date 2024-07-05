/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import LongCover from '../components/LongCover';

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem; /* Add padding to the container */
  padding-left: 5rem;
`;

const SearchResult = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const SearchTerm = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
  font-family: 'SUIT' sans-serif;
`;

function Search() {
  // Mock function to fetch data
  const items = [
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
    // Add more items as needed
  ];

  return (
    <BigContainer>
      <SearchResult>Search Result</SearchResult>
      <SearchTerm> '검색 단어' 검색 결과</SearchTerm>
      {items.map((item, index) => (
        <LongCover key={index} {...item} />
      ))}
    </BigContainer>
  );
}

export default Search;
