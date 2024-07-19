import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { postLyrics } from '../api/musicVideos';

const BigContainer = styled.div`
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

const Title = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  margin-left: 11.5%;
  margin-bottom: 2rem;
`;

const LyricsContainer = styled.div`
  width: 18rem;
  height: 30rem;
  padding: 2rem;
  background-image: linear-gradient(
    to right,
    #20004e,
    #37006e,
    #2c0177,
    #32005a
  );
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 15px 0 rgba(81, 39, 139, 0.75);
  transition: all 0.4s ease-in-out;
  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 0.1rem solid #ffffff;
    `}
  &:hover {
    background-image: linear-gradient(
      to right,
      #32005a,
      #2c0177,
      #37006e,
      #20004e
    );
    box-shadow: 0 6px 20px 0 rgba(81, 39, 139, 0.85);
  }
`;

const Button = styled.button`
  width: 8rem;
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin-top: 2rem;
  text-align: center;
  margin-left: 5rem;
  border: none;
  border-radius: 3rem;
  transition: all 0.4s ease-in-out;
  background-image: linear-gradient(
    to right,
    #20004e,
    #37006e,
    #4600be,
    #32005a
  );
  box-shadow: 0 4px 15px 0 rgba(81, 39, 139, 0.75);

  &:hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
  }

  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  font-size: 1rem;
  font-family: 'suit';
  color: white;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  display: flex;
  padding-left: 35%;
`;

function LyricsSelect() {
  const [selectedLyrics, setSelectedLyrics] = useState('');
  const [lyricsList, setLyricsList] = useState([]);

  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const { voice, language, selectedGenres, songTitle } = state;
        const lyrics = await postLyrics(
          songTitle,
          selectedGenres,
          language,
          voice,
        );
        // const lyrics = {
        //   lyrics_ori: ['1번가사', '2번가사', '3번가사'],
        //   lyrics_eng: ['1번가사', '2번가사', '3번가사'],
        // };
        console.log('가사나와랏', lyrics.lyrics_ori);
        setLyricsList(lyrics);
      } catch (error) {
        console.error('Failed to fetch lyrics:', error);
      }
    };

    fetchLyrics();
  }, [state]);

  const handleClick = (lyrics) => {
    setSelectedLyrics(lyrics);
  };

  const goMain = () => {
    navigate('/mainPage');
  };

  const click = () => {
    // Assuming you have variables: voice, language, tempo, selectedGenres, selectedInstruments, songTitle
    goMain();
  };

  return (
    <BigContainer>
      <Title>Select Lyrics</Title>
      <OtherContainer>
        {lyricsList?.lyrics_ori?.map((lyrics, index) => (
          <LyricsContainer
            key={index}
            isSelected={selectedLyrics === lyrics}
            onClick={() => handleClick(lyrics)}
          >
            <Text>{lyrics}</Text>
          </LyricsContainer>
        ))}
      </OtherContainer>
      <ButtonContainer>
        <Button onClick={click}>Create</Button>
      </ButtonContainer>
    </BigContainer>
  );
}

export default LyricsSelect;
