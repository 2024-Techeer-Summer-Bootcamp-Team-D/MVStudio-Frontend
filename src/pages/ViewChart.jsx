import React from 'react';
import styled from 'styled-components';

const Profile = styled.button`
  width: 6rem;
  height: 2rem;
  font-size: 1.5rem;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  margin-right: 4rem;
  margin-top: 0rem;
  position: relative;
  cursor: pointer;
`;

const Statistics = styled.button`
  width: 6rem;
  height: 2rem;
  font-size: 1.5rem;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  margin-top: 0rem;
  position: relative;
  cursor: pointer;
`;

const WhiteLine = styled.div`
  width: 75rem;
  height: 2px;
  background-color: #ffffff;
  margin-top: 3.5rem;
  margin-left: -18rem;
  position: relative;
`;

const GoViewChart = styled.button`
  width: 6rem;
  height: 2rem;
  font-size: 1rem;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  margin-right: 3.5rem;
  margin-left: -72.8rem;
  margin-top: 4rem;
  position: relative;
  cursor: pointer;
`;

const GoAgeChart = styled.button`
  width: 6rem;
  height: 2rem;
  font-size: 1rem;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  margin-top: 4rem;
  margin-right: 3.5rem;
  position: relative;
  cursor: pointer;
`;

const GoCountryChart = styled.button`
  width: 6rem;
  height: 2rem;
  font-size: 1rem;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  margin-top: 4rem;
  position: relative;
  cursor: pointer;
`;

const ChartContainer = styled.div`
  display: flex;
  position: relative;
`;

const StatInformation = styled.div`
  width: 17rem;
  height: 25rem;
  background-color: #36045c;
  margin-top: 10rem;
  margin-left: 7rem;
  border-radius: 2rem;
  position: relative;
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

const ChartSpace = styled.div`
  width: 40rem;
  height: 25rem;
  background-color: #cfcfcf;
  position: relative;
  margin-top: 10rem;
  margin-left: -25rem;
  text-align: center;
`;

const handleClick = () => {};

const ViewChart = () => {
  return (
    <ChartContainer>
      <Profile onClick={handleClick}>Profile</Profile>
      <Statistics onClick={handleClick}>My&nbsp;Statistics</Statistics>
      <WhiteLine></WhiteLine>
      <GoViewChart onClick={handleClick}>View&nbsp;Chart</GoViewChart>
      <GoAgeChart onClick={handleClick}>Age&nbsp;Chart</GoAgeChart>
      <GoCountryChart onClick={handleClick}>Country&nbsp;Chart</GoCountryChart>
      <ChartSpace>차드 들어갈 곳</ChartSpace>
      <StatInformation>
        <UserNickname>UserNickname</UserNickname>
        <InfoLine></InfoLine>
        <TotalBox>
          <TotalView>Total View</TotalView>
          <TotalViewDB>1,000,000</TotalViewDB>
          <TotalVideo>Total Video</TotalVideo>
          <TotalVideoDB>50</TotalVideoDB>
        </TotalBox>
      </StatInformation>
    </ChartContainer>
  );
};

export default ViewChart;
