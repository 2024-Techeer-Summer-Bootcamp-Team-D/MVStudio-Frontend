import React from 'react';
import styled from 'styled-components';

const HeadphoneImage = styled.img`
  float: left;
  margin-top: -2rem;
  margin-left: 20rem;
  width: 19rem;
  height: 17rem;
  position: relative;
`;

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 5rem;
  margin-left: 3rem;

  &:hover .overlay {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 12rem;
  height: 12.5rem;
  border-radius: 1.5rem;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

const MainText = styled.div`
  color: white;
  margin-top: 7rem;
  margin-left: 42rem;
  font-size: 2rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
`;

const MostViewText = styled.div`
  color: white;
  font-size: 2rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 5rem;
  margin-left: 16rem;
`;

const RecentUploadedText = styled.div`
  color: white;
  font-size: 2rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 3rem;
  margin-left: 16rem;
`;

const RecentViewText = styled.div`
  color: white;
  font-size: 2rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 3rem;
  margin-left: 16rem;
`;

const MyCountyText = styled.div`
  color: white;
  font-size: 2rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 3rem;
  margin-left: 16rem;
`;

const TitleText1 = styled.div`
  color: white;
  font-size: 1rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 0.5rem;
  margin-left: 15.5rem;
`;

const TitleText2 = styled.div`
  color: white;
  font-size: 1rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 0.5rem;
  margin-left: 13rem;
`;

const TitleText3 = styled.div`
  color: white;
  font-size: 1rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 0.5rem;
  margin-left: 13rem;
`;

const TitleText4 = styled.div`
  color: white;
  font-size: 1rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 0.5rem;
  margin-left: 13rem;
`;

const TitleText5 = styled.div`
  color: white;
  font-size: 1rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 0.5rem;
  margin-left: 13rem;
`;

const TitleText6 = styled.div`
  color: white;
  font-size: 1rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 0.5rem;
  margin-left: 13rem;
`;

const TitleSmallText = styled.div`
  color: white;
  font-size: 0.5rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
`;

const TextBox = styled.div`
  display: flex;
`;

const PagePart = styled.div``;

const Part = styled.div``;

const MostView = styled.div`
  display: flex;
  margin-top: -3rem;
  margin-left: 12rem;
`;

const RecentUploaded = styled.div`
  display: flex;
  margin-top: -4rem;
  margin-left: 12rem;
`;

const RecentView = styled.div`
  display: flex;
  margin-top: -4rem;
  margin-left: 12rem;
`;

const MyCountyTrend = styled.div`
  display: flex;
  margin-top: -4rem;
  margin-left: 12rem;
`;

const MainPage = () => {
  return (
    <PagePart>
      <Part>
        <HeadphoneImage src="https://i.ibb.co/F5pG38h/qwdascscwec-removebg-preview.png" />
        <MainText>
          단
          <br />
          하나뿐인,
          <br />
          나만의
          <br />
          뮤직비디오
          <br />
        </MainText>
      </Part>
      <MostViewText>Most view</MostViewText>
      <MostView>
        <ImageContainer>
          <Image src="https://i.ibb.co/Fn93yzJ/1.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/vVhY1w6/2.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/g6vLFDV/3.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/99cZ04Y/4.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/zxwxR63/5.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/ZYLvzjs/9.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
      </MostView>
      <TextBox>
        <TitleText1>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText1>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText3>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText3>
        <TitleText4>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText4>
        <TitleText5>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText5>
        <TitleText6>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText6>
      </TextBox>
      <RecentUploadedText>Recent uploaded</RecentUploadedText>
      <RecentUploaded>
        <ImageContainer>
          <Image src="https://i.ibb.co/Fn93yzJ/1.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/vVhY1w6/2.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/g6vLFDV/3.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/99cZ04Y/4.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/zxwxR63/5.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/ZYLvzjs/9.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
      </RecentUploaded>
      <TextBox>
        <TitleText1>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText1>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText3>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText3>
        <TitleText4>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText4>
        <TitleText5>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText5>
        <TitleText6>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText6>
      </TextBox>
      <RecentViewText>Recent view</RecentViewText>
      <RecentView>
        <ImageContainer>
          <Image src="https://i.ibb.co/Fn93yzJ/1.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/vVhY1w6/2.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/g6vLFDV/3.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/99cZ04Y/4.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/zxwxR63/5.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/ZYLvzjs/9.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
      </RecentView>
      <TextBox>
        <TitleText1>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText1>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText3>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText3>
        <TitleText4>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText4>
        <TitleText5>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText5>
        <TitleText6>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText6>
      </TextBox>
      <MyCountyText>My country trend</MyCountyText>
      <MyCountyTrend>
        <ImageContainer>
          <Image src="https://i.ibb.co/Fn93yzJ/1.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/vVhY1w6/2.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/g6vLFDV/3.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/99cZ04Y/4.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/zxwxR63/5.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/ZYLvzjs/9.webp" />
          <Overlay className="overlay">Play</Overlay>
        </ImageContainer>
      </MyCountyTrend>
      <TextBox>
        <TitleText1>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText1>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText3>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText3>
        <TitleText4>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText4>
        <TitleText5>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText5>
        <TitleText6>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText6>
      </TextBox>
    </PagePart>
  );
};

export default MainPage;
