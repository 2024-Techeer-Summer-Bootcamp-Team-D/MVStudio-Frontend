/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styled from 'styled-components';
import { postVideos } from '../api/musicVideos'; // postVideos 함수 가져오기

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
  font-size: 2rem;
  color: #ffffff;
  margin-left: 11.5%;
`;

const LyricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const styles = {
  blockquote: {
    width: '13rem',
    height: '27rem',
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: '1%',
    padding: '2rem 3rem',
    fontFamily: 'suit',
    fontSize: '1rem',
    color: '#ffffff',
  },
  style1: {
    position: 'relative',
    background: '#1d0f3c',

    borderTop: '0.1rem solid #441c99',
    borderRight: '0.1rem solid #000000',
    borderBottom: '0.1rem solid #000000',
    borderLeft: '0.1rem solid #441c99',
    boxShadow: '-.2rem -.2rem .25rem rgba(0,0,0,.1)',
  },
  style1Before: {
    content: '""',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '1rem',
    height: '1rem',
    borderTop: '1rem solid #441c99',
    borderRight: '1rem solid #000000',
    boxShadow: '-.2rem -.2rem .25rem rgba(0,0,0,.1)',
  },
  style1After: {
    content: '""',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '1rem',
    height: '1rem',
    borderBottom: '1rem solid #000000',
    borderLeft: '1rem solid #441c99',
  },
};

const Button = styled.button`
  width: 14rem;
  height: 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;

  text-align: center;
  margin-left: 5rem;
  border: none;
  background-size: 300% 100%;
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

async function handlePostVideos() {
  try {
    const response = await postVideos();
    console.log('Video posted successfully:', response);
  } catch (error) {
    console.error('Error posting video:', error);
  }
}

function LyricsSelect() {
  return (
    <BigContainer>
      <Title>Select Lyrics</Title>
      <OtherContainer>
        <LyricsContainer>
          <div>
            <blockquote style={{ ...styles.blockquote, ...styles.style1 }}>
              La Vie en Rose &#9834;
              <br />
              <br />
              빨갛게 물들여 지금 이 시간 make it red Make it r롭게 eh eh (Rose)
              <br />
              <br /> 이런 느낌은 ruby보다 더 내가 느끼는 반짝임처럼 끌리면
              이끌려 na na now 바로 지금 na na now I wanna make it blue 상상해봐
              너의 la vie en rose
              <br />
              <br /> 더 깊어진 눈빛 그 속에 붉어진 내 맘을 타오르게 해 나를
              춤추게 제나 빛날 수 있게
              <div style={styles.style1Before}></div>
              <div style={styles.style1After}></div>
            </blockquote>
          </div>
          <Button onClick={handlePostVideos}>Select</Button>
        </LyricsContainer>
        <LyricsContainer>
          <div>
            <blockquote style={{ ...styles.blockquote, ...styles.style1 }}>
              Panorama &#9834;
              <br />
              <br />
              바람 끝에 찾아온 작은 기억 귓가에 퍼지는 깊은 울림, ring my bell
              아름다운 내 맘을 한가득 담아서 조금씩 은은히 줄 거야
              <br />
              <br /> 너와 나 손끝이 닿을 때 eyes on me 내 맘이 들린다면 더 크게
              외쳐줘, oh 조용히 시작된 한 편의 드라마야 간직했던 조각들을 펼쳐
              <br />
              <br /> 다시 한번 지나가는 그때 계절의 풍경 못다 한 우리 이야기
              꿈일까 싶어, 멈추지 않게 두 눈을 감고 느껴봐 (이 순간) Shoot! Take
              a panorama
              <div style={styles.style1Before}></div>
              <div style={styles.style1After}></div>
            </blockquote>
          </div>
          <Button onClick={handlePostVideos}>Select</Button>
        </LyricsContainer>
        <LyricsContainer>
          <div>
            <blockquote style={{ ...styles.blockquote, ...styles.style1 }}>
              FIESTA &#9834;
              <br />
              <br />
              때가 왔어 오랜 기다림을 끝내 움츠렸던 맘을 일으켜 활짝 기지개를 켜
              난 ah 눈빛은 어느샌가 짙어져 있는 걸 나의 시간이 됐어
              <br />
              <br /> 아침에게 말해 oh 오늘이 좋을 것 같아 이젠 아득했던 꿈들이
              멀지가 않아 오직 나를 위한 woo 축제를 열어볼 거야 좋을 때란 거
              그것 역시 내가 정해
              <br />
              <br /> 색색의 꽃을 피우고 꽃가루가 흩날리면 축제는 절정인 걸
              끝나지 않을 이건 climax 나의 모든 순간이 아름답고 눈부셔 이거
              하나만 기억해 지금이라고
              <div style={styles.style1Before}></div>
              <div style={styles.style1After}></div>
            </blockquote>
          </div>
          <Button onClick={handlePostVideos}>Create</Button>
        </LyricsContainer>
      </OtherContainer>
    </BigContainer>
  );
}

export default LyricsSelect;
