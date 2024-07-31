import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LongCover from '../components/search/LongCover';
import { useLocation } from 'react-router-dom';
import { getsearch } from '../api/search';

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 3%;
`;

const LoadingMessage = styled.img.attrs({
  src: 'https://i.ibb.co/jvXptkm/loading.gif',
})`
  width: 2rem;
  height: 1rem;
  margin-bottom: 1rem;
`;

const NoResultsMessage = styled.p`
  color: #ffffff;
  font-size: 2rem;
  position: absolute;
  margin-top: 20%;
  left: 40%;
`;

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (page) => {
    if (loading) return; // 이미 로딩 중이면 중복 호출 방지
    setLoading(true);
    try {
      const result = await getsearch(page, 3, keyword); // 페이지당 데이터 3개씩 가져오기
      if (result && result.music_videos) {
        setItems((prevItems) =>
          page === 1
            ? result.music_videos
            : [...prevItems, ...result.music_videos],
        );
        setHasMore(result.pagination && result.pagination.next_page);
      } else {
        setItems([]); // 검색 결과가 없을 때 빈 배열로 설정
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setItems([]); // 에러 발생 시 빈 배열로 설정
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setItems([]); // 검색어가 변경될 때 items 초기화
    setHasMore(true); // 새로운 검색 시 hasMore 초기화
    setCurrentPage(1); // 페이지 번호 초기화
    fetchData(1); // 새로운 검색어로 데이터를 가져옴
  }, [keyword]);

  useEffect(() => {
    fetchData(currentPage); // 페이지가 변경될 때마다 데이터를 가져옵니다.
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (hasMore && !loading) {
        const scrollPosition =
          window.innerHeight + document.documentElement.scrollTop;
        const pageHeight = document.documentElement.offsetHeight;
        if (pageHeight - scrollPosition <= 10 * 16) {
          // 스크롤이 끝에 도달했을 때 fetchData를 호출합니다.
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <WholeContainer>
      <BigContainer>
        {items.length > 0
          ? items.map((item, index) => (
              <LongCover
                key={index}
                data={{
                  pic: item.cover_image,
                  title: item.subject,
                  uploader: item.member_name,
                  view: item.views,
                  mvlength: formatTime(item.length),
                  profile_image: item.profile_image,
                  id: item.id,
                  options: {
                    genres: item.genres,
                    instruments: item.instruments,
                    style_name: item.style_name,
                    language: item.language,
                    vocal: item.vocal,
                    tempo: item.tempo,
                  },
                }}
              />
            ))
          : !loading && (
              <NoResultsMessage>검색결과가 없습니다.</NoResultsMessage>
            )}
        {loading && <LoadingMessage />}
      </BigContainer>
    </WholeContainer>
  );
};

export default Search;
