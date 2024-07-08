import React from 'react';
import styled from 'styled-components';
import Square from '../components/Lyricscover';
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
          <Square>dddddddddddddddddddddddddddddd,ddddddddddddddddd</Square>
          <MainButton>Select</MainButton>
        </LyricsContainer>
        <LyricsContainer>
          <Square>Verse1</Square>
          <MainButton>Select</MainButton>
        </LyricsContainer>
        <LyricsContainer>
          <Square>Verse1</Square>
          <MainButton>Select</MainButton>
        </LyricsContainer>
      </OtherContainer>
    </BigContianer>
  );
}

export default LyricsSelect;
