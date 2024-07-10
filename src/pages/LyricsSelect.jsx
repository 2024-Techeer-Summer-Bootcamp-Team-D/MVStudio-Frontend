import React from 'react';
import styled from 'styled-components';
import Square from '../components/LyricsCover';
import MainButton from '../components/MainButton';

const BigContianer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const OtherContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-right: 8rem;
  gap: 3.4rem;
`;

const Tilte = styled.p`
  font-size: 2rem;
  color: #ffffff;
`;
const LyricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function LyricsSelect() {
  return (
    <BigContianer>
      <Tilte>Select Lyrics</Tilte>
      <OtherContainer>
        <LyricsContainer>
          <Square>Verse 1</Square>
          <MainButton>Select</MainButton>
        </LyricsContainer>
        <LyricsContainer>
          <Square>Verse2</Square>
          <MainButton>Select</MainButton>
        </LyricsContainer>
        <LyricsContainer>
          <Square>Verse3</Square>
          <MainButton>Select</MainButton>
        </LyricsContainer>
      </OtherContainer>
    </BigContianer>
  );
}

export default LyricsSelect;
