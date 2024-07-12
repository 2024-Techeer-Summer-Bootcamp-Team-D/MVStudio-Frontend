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

const GoContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  & > button {
  }
`;

const ViewButton = styled.button`
  width: 4rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-top-right-radius: 1rem;
  border-bottom-color: #9c9c9cc0;
  border-left: none;
  border-top: none;
  border-right: none;
  color: #fff;
  cursor: pointer;
  height: 3.2rem;
  text-align: center;
  background-size: 300% 100%;
  transition: all 0.4s ease-in-out;
  background-image: ${({ active }) =>
    active
      ? 'linear-gradient(to right, #4600be, #32005a)'
      : 'linear-gradient(to right, #20004e, #37006e, #4600be, #32005a)'};
  box-shadow: ${({ active }) =>
    active ? '0 4px 15px 0 rgba(81, 39, 139, 0.75)' : 'none'};

  &:hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
  }

  &:focus {
    outline: none;
  }
`;

const AgeButton = styled.button`
  width: 4rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  height: 3.2rem;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  transition: all 0.4s ease-in-out;
  background-image: ${({ active }) =>
    active
      ? 'linear-gradient(to right, #4600be, #32005a)'
      : 'linear-gradient(to right, #20004e, #37006e, #4600be, #32005a)'};
  box-shadow: ${({ active }) =>
    active ? '0 4px 15px 0 rgba(81, 39, 139, 0.75)' : 'none'};

  &:hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
  }

  &:focus {
    outline: none;
  }
`;

const CountryButton = styled.button`
  width: 4rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-bottom-right-radius: 1rem;
  border-top-color: #454545c7;
  border-right: none;
  border-left: none;
  border-bottom: none;
  color: #fff;
  cursor: pointer;
  height: 3.2rem;
  text-align: center;
  background-size: 300% 100%;
  transition: all 0.4s ease-in-out;
  background-image: ${({ active }) =>
    active
      ? 'linear-gradient(to right, #4600be, #32005a)'
      : 'linear-gradient(to right, #20004e, #37006e, #4600be, #32005a)'};
  box-shadow: ${({ active }) =>
    active ? '0 4px 15px 0 rgba(81, 39, 139, 0.75)' : 'none'};

  &:hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
  }

  &:focus {
    outline: none;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ChartandStatContainer = styled.div`
  width: 60rem;
  height: 32rem;
  margin-top: 4rem;
  margin-left: 6rem;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const StatSquare = styled.div`
  width: 25rem;
  height: 32rem;
  background-color: #36045c;
  position: relative;
  border-radius: 1rem;
  margin-left: 2rem;
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

const ThisWeakDB = styled.p`
  color: white;
  font-size: 1rem;
  margin-top: -0.5rem;
  position: relative;
`;

const ThisWeak = styled.p`
  color: white;
  font-size: 1rem;
  margin-top: 3rem;
  position: relative;
`;

const AlbumContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 80%;
  margin: auto;
  margin-top: -13rem;
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
      pic: 'https://i.ibb.co/DkwwmCn/qwdqwd.webp',
      nickname: 'View Chart',
      totalView: '1,000,000',
      totalVideo: '50',
      thisWeak: '5,000',
    },
  ];

  const ageChartData = [
    {
      pic: 'https://i.ibb.co/DkwwmCn/qwdqwd.webp',
      nickname: 'Age Chart',
      totalView: '2,000,000',
      totalVideo: '70',
      thisWeak: '5,000',
    },
  ];

  const countryChartData = [
    {
      pic: 'https://i.ibb.co/k5SgySn/image.png',
      nickname: 'Country Chart',
      totalView: '3,000,000',
      totalVideo: '90',
      thisWeak: '5,000',
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

      <GoContainer>
        <ViewButton
          active={activeTab === 'ViewChart'}
          onClick={() => setActiveTab('ViewChart')}
        >
          View
        </ViewButton>
        <AgeButton
          active={activeTab === 'AgeChart'}
          onClick={() => setActiveTab('AgeChart')}
        >
          Age
        </AgeButton>
        <CountryButton
          active={activeTab === 'CountryChart'}
          onClick={() => setActiveTab('CountryChart')}
        >
          Country
        </CountryButton>
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
                <ThisWeak>Weak View</ThisWeak>
                <ThisWeakDB>{item.thisWeak}</ThisWeakDB>
              </TotalBox>
            </StatSquare>
          </ChartandStatContainer>
        ))}
      </AlbumContainer>
    </ChartContainer>
  );
};

export default ViewChart;
