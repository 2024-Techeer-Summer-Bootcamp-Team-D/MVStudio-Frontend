import React from 'react';
import PropTypes from 'prop-types'; // prop-types import 추가
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IosShareIcon from '@mui/icons-material/IosShare';

const BigContainer = styled.div`
  display: flex;
  width: 95rem;
  height: 19rem;
  position: relative;
  flex-direction: row;
  align-items: start;
  border-radius: 2rem;
`;

const ReaderContainer = styled.div`
  position: relative;
  width: 30rem;
  height: 18rem;
  margin-top: 2.8rem;
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
  border-radius: 0.5rem;
  width: 100%;
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
  margin-top: 3.8rem;
  margin-bottom: 1rem;
`;

const UploaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UploaderIcon = styled(PersonOutlineIcon)`
  color: #ffffff;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 550;
  color: #ffffff;
  margin-bottom: 0.5rem;
  margin-top: -1rem;
`;

const ViewContainer = styled.div`
  display: flex;
  align-items: center;

  margin-left: 0.1rem;
`;

const Uploader = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
`;

const View = styled.p`
  font-size: 1rem;
  color: #ffffff;
  margin: 0;
  margin-right: auto;
`;

const Options = styled.div`
  font-size: 1.2rem;
  color: #ffffff;
  margin: 0;
  word-wrap: break-word;
  width: 93.5%;
  height: 14rem;
  border-radius: 1rem;
  line-height: 1.1;
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

const LongCover = ({ data }) => {
  if (!data) {
    return null; // 데이터가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <BigContainer>
      <ReaderContainer>
        <ReaderPic src={data.pic} className="reader-pic" />
        <PlayIcon className="play-icon" />
      </ReaderContainer>
      <Overlay>
        <Title>{data.title}</Title>
        <ViewContainer>
          <View>{data.view} views</View>
        </ViewContainer>
        <UploaderContainer>
          <UploaderIcon />
          <Uploader>{data.uploader}</Uploader>
        </UploaderContainer>

        <Options>
          {data.options.genres.join(', ')}
          ,&nbsp;{data.options.instruments.join(', ')}
          ,&nbsp;{data.options.style_name}
          ,&nbsp;{data.options.language}
          ,&nbsp;{data.options.vocal}
          ,&nbsp;{data.options.tempo}
        </Options>
        <ExtraInfo>
          <div>
            <DeleteIcon owner={data.isOwner} />
            <ShareIcon owner={data.isOwner} />
          </div>
        </ExtraInfo>
      </Overlay>
    </BigContainer>
  );
};

LongCover.propTypes = {
  data: PropTypes.shape({
    pic: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    uploader: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,
    options: PropTypes.shape({
      genres: PropTypes.arrayOf(PropTypes.string).isRequired,
      instruments: PropTypes.arrayOf(PropTypes.string).isRequired,
      style_name: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      vocal: PropTypes.bool.isRequired,
      tempo: PropTypes.string.isRequired,
    }).isRequired,
    isOwner: PropTypes.bool.isRequired,
  }).isRequired,
};

export default LongCover;
