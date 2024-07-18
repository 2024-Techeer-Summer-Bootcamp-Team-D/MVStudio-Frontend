import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LongCover from '../components/LongCover';
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
  font-size: 1.5rem;
  color: #555555;
  margin-top: 2rem;
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
      const result = await getsearch(page, 3, keyword); // 페이지당 데이터 10개씩 가져오기
      console.log('Response data:', result);
      if (result && result.music_videos) {
        setItems((prevItems) =>
          page === 1
            ? result.music_videos
            : [...prevItems, ...result.music_videos],
        );
        setHasMore(result.pagination && result.pagination.next_page);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (hasMore && !loading) {
        const scrollPosition =
          window.innerHeight + document.documentElement.scrollTop;
        const pageHeight = document.documentElement.offsetHeight;
        if (pageHeight - scrollPosition <= 10 * 16) {
          // 10rem을 px로 환산
          // 스크롤이 끝에 도달했을 때 fetchData를 호출합니다.
          setTimeout(() => {
            setCurrentPage((prevPage) => prevPage + 1);
          }, 2000); // 2초 후에 fetchData 호출
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    fetchData(1); // 최초 호출을 페이지 1로 설정
  }, [keyword]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchData(currentPage); // 페이지가 변경될 때마다 데이터를 가져옵니다.
    }
  }, [currentPage]);

  return (
    <WholeContainer>
      <BigContainer>
        {items.length > 0 &&
          items.map((item, index) => (
            <LongCover
              key={index}
              data={{
                pic: item.cover_image,
                title: item.subject,
                uploader: item.member_name,
                view: item.views,
                mvlength: formatTime(item.length),
                profile_image: item.profile_image,
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
          ))}
        {loading && <LoadingMessage />}
        {!loading && items.length === 0 && (
          <NoResultsMessage>검색결과가 없습니다.</NoResultsMessage>
        )}
      </BigContainer>
    </WholeContainer>
  );
};

export default Search;
