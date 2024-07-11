import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Statistics = styled.button`
  width: 6rem;
  height: 2rem;
  font-size: 1.5rem;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  margin-left: 2rem;
  margin-top: 2rem;
  position: relative;
  cursor: pointer;
`;

const WhiteLine = styled.div`
  width: 70rem;
  height: 0.1rem;
  background-color: #8b8b8bb2;
  position: relative;
  margin-top: 1rem;
`;

const GoContainer = styled.div`
  margin-top: 0.5rem;
  margin-left: 2rem;
  position: relative;
  & > button {
    margin-right: 1.5rem;
  }
`;

const MoveButton = styled.button`
  width: 6rem;
  font-size: 1rem;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  position: relative;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.active ? '0.2rem solid rgba(139, 139, 139, 0.7)' : 'none'};
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ChartandStatContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 4rem;
  margin-left: 6rem;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const StatSquare = styled.div`
  width: 40rem;
  height: 25rem;
  background-color: #36045c;
  position: relative;
  border-radius: 1rem;
`;

const UserNickname = styled.p`
  color: white;
  font-size: 1rem;
  margin-top: 3rem;
  text-align: center;
  position: relative;
`;

const InfoLine = styled.div`
  width: 80%;
  height: 1px;
  background-color: #ffffff;
  position: relative;
  margin: 0 auto;
  position: relative;
`;

const TotalBox = styled.div`
  text-align: left;
  margin-left: 2.2rem;
  position: relative;
`;

const TotalView = styled.p`
  color: white;
  font-size: 1rem;
  margin-top: 1rem;
  position: relative;
`;

const TotalViewDB = styled.p`
  color: white;
  font-size: 1rem;
  margin-top: -0.5rem;
  position: relative;
`;

const TotalVideo = styled.p`
  color: white;
  font-size: 1rem;
  margin-top: 3rem;
  position: relative;
`;

const TotalVideoDB = styled.p`
  color: white;
  font-size: 1rem;
  margin-top: -0.5rem;
  position: relative;
`;

const AlbumContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 80%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 1rem;
  transition: 0.3s;
`;

const AlbumCoverImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  object-fit: cover;
`;

const AlbumCover = ({ pic }) => <AlbumCoverImage src={pic} alt="Album Cover" />;

AlbumCover.propTypes = {
  pic: PropTypes.string.isRequired,
};

const handleClick = () => {};

const ViewChart = () => {
  const [activeTab, setActiveTab] = useState('ViewChart');

  const viewChartData = [
    {
      pic: 'https://i.ibb.co/Fn93yzJ/1.webp',
      nickname: 'ViewChart',
      totalView: '1,000,000',
      totalVideo: '50',
    },
  ];

  const ageChartData = [
    {
      pic: 'https://i.ibb.co/cxwzVrb/cat.jpg',
      nickname: 'AgeChart',
      totalView: '2,000,000',
      totalVideo: '70',
    },
  ];

  const countryChartData = [
    {
      pic: 'https://i.ibb.co/99cZ04Y/4.webp',
      nickname: 'CountryChart',
      totalView: '3,000,000',
      totalVideo: '90',
    },
  ];

  const getActiveData = () => {
    switch (activeTab) {
      case 'ViewChart':
        return viewChartData;
      case 'AgeChart':
        return ageChartData;
      case 'CountryChart':
        return countryChartData;
      default:
        return [];
    }
  };

  return (
    <ChartContainer>
      <Statistics onClick={handleClick}>My&nbsp;Statistics</Statistics>
      <WhiteLine></WhiteLine>
      <GoContainer>
        <MoveButton
          active={activeTab === 'ViewChart'}
          onClick={() => setActiveTab('ViewChart')}
        >
          View&nbsp;chart
        </MoveButton>
        <MoveButton
          active={activeTab === 'AgeChart'}
          onClick={() => setActiveTab('AgeChart')}
        >
          Age&nbsp;chart
        </MoveButton>
        <MoveButton
          active={activeTab === 'CountryChart'}
          onClick={() => setActiveTab('CountryChart')}
        >
          Country&nbsp;chart
        </MoveButton>
      </GoContainer>
      <AlbumContainer>
        {getActiveData().map((item, index) => (
          <ChartandStatContainer key={index}>
            <AlbumCover pic={item.pic} />
            <StatSquare>
              <UserNickname>{item.nickname}</UserNickname>
              <InfoLine></InfoLine>
              <TotalBox>
                <TotalView>Total View</TotalView>
                <TotalViewDB>{item.totalView}</TotalViewDB>
                <TotalVideo>Total Video</TotalVideo>
                <TotalVideoDB>{item.totalVideo}</TotalVideoDB>
              </TotalBox>
            </StatSquare>
          </ChartandStatContainer>
        ))}
      </AlbumContainer>
    </ChartContainer>
  );
};

export default ViewChart;
