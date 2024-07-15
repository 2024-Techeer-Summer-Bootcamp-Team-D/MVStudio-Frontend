/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const BigContainer = styled.div`
  display: flex;
  width: 70rem;
  height: 20rem;
  position: relative;
  flex-direction: row;
  align-items: start;
  margin-bottom: 2rem;
  padding: 1rem;
  /* background-color: rgba(54, 48, 48, 0.6); */
  background-color: #212121;
  border: 0.1rem solid rgba(255, 255, 255, 0.3);

  border-radius: 2rem;
`;

const ReaderContainer = styled.div`
  position: relative;
  width: 30rem;
  height: 100%;
  z-index: 2; /* Ensure this is above the InfoContainer */
  display: flex;
  align-items: center;
  justify-content: center; /* Center children horizontally and vertically */

  &:hover .reader-pic {
    filter: brightness(0.8);
  }

  &:hover .play-icon {
    opacity: 1;
  }
`;

const ReaderPic = styled.img`
  border-radius: 1rem;
  width: 100%; /* Adjusted to maintain aspect ratio */
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
  filter: brightness(90%);
`;

const PlayIcon = styled(PlayArrowIcon)`
  position: absolute;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
  z-index: 3;
`;

const Overlay = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  width: calc(100% - 12.375rem);
  height: 100%;
  margin-left: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const UploaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const UploaderIcon = styled(PersonOutlineIcon)`
  color: #ffffff;
  margin-right: 0.5rem;
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 550;
  color: #ffffff;
  margin-bottom: 0.5rem;
  margin-top: 0rem;
`;

const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Uploader = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  margin: 0;
`;

const ViewIcon = styled(VisibilityIcon)`
  color: #ffffff;
  margin-right: 0.5rem;
`;

const View = styled.p`
  font-size: 1rem;
  color: #ffffff;
  margin: 0;
`;

const Options = styled.p`
  font-size: 1.2rem;
  color: #c0bdbd;
  margin: 0;
  word-wrap: break-word;
  width: 93.5%;
  background-color: rgba(86, 82, 82, 0.5);

  height: 40%;
  padding: 1rem;
  border-radius: 1rem;
`;

const ExtraInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  width: 98%;
  gap: 1rem;
`;

const DeleteIcon = styled(DeleteOutlineIcon)`
  visibility: ${(props) => (props.owner ? 'visible' : 'hidden')};
  color: #ffffff;
`;

const ShareIcon = styled(IosShareIcon)`
  visibility: ${(props) => (props.owner ? 'visible' : 'hidden')};
  color: #ffffff;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

function LongCover({ pic, title, uploader, view, options, owner }) {
  return (
    <BigContainer>
      <ReaderContainer>
        <ReaderPic className="reader-pic" src={pic} alt="Reader" />
        <PlayIcon fontSize="large" className="play-icon" />
      </ReaderContainer>
      <Overlay>
        <ExtraInfo>
          <Title>{title}</Title>
          <Icons>
            <ShareIcon owner={owner} fontSize="medium" />
            <DeleteIcon owner={owner} fontSize="medium" />
          </Icons>
        </ExtraInfo>
        <UploaderContainer>
          <UploaderIcon fontSize="medium" />
          <Uploader>{uploader}</Uploader>
        </UploaderContainer>
        <ViewContainer>
          <ViewIcon fontSize="medium" />
          <View>{view}</View>
        </ViewContainer>
        <Options>{options}</Options>
      </Overlay>
    </BigContainer>
  );
}

export default LongCover;
