import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the necessary chart.js components
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useUser } from '@/libs/stores/userStore';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
// import { getUsername } from '@/api/member';
Chart.register(ChartDataLabels);
import {
  getGenderData,
  getViewData,
  getCountriesData,
  getAgesData,
} from '@/api/charts';

const Statistics = styled.button`
  width: 6rem;
  height: 2rem;
  font-size: 1.7rem;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  margin-top: 2rem;
  position: relative;
  cursor: pointer;
  display: flex;
  margin-left: 0.5rem;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
`;

const TotalBox = styled.div`
  text-align: left;
  margin-left: 1rem;
  position: relative;
`;

const TotalText = styled.p`
  color: white;
  font-size: 1.3rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  position: relative;
  /* border-right: 1px solid #a4a4a4; */
`;

const StudioText = styled.p`
  color: white;
  font-size: 1.3rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  position: relative;
`;

const ChartSizeSetting = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5rem;
`;

const ViewChart = () => {
  const [viewData, setViewData] = useState(null);
  const [genderData, setGenderData] = useState(null);
  const [ageData, setAgeData] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [value, setValue] = useState(0);
  const username = 'genie';
  // const username = useUser((state) => state.username);
  // const fetchUsername = useUser((state) => state.fetchUsername);
  // useEffect(() => {
  //   fetchUsername();
  // }, []);
  // console.log('유저네임:', username);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchViewData = async () => {
      try {
        const response = await getViewData(username);
        setViewData(response);
        console.log('조회수 정보:', response);
      } catch (error) {
        console.log('조회수 조회 오류', error);
      }
    };
    const fetchGenderData = async () => {
      try {
        const response = await getGenderData(username);
        setGenderData(response);
        console.log('젠더 정보:', response);
      } catch (error) {
        console.log('조회수 조회 오류', error);
      }
    };
    const fetchCountryData = async () => {
      try {
        const response = await getCountriesData(username);
        setCountryData(response);
        console.log('나라 정보:', response);
      } catch (error) {
        console.log('조회수 조회 오류', error);
      }
    };
    const fetchAgeData = async () => {
      try {
        const response = await getAgesData(username);
        setAgeData(response);
        console.log('연령별 정보:', response);
      } catch (error) {
        console.log('조회수 조회 오류', error);
      }
    };
    fetchAgeData();
    fetchCountryData();
    fetchGenderData();
    fetchViewData();
  }, [username]);

  if (!viewData || !ageData || !countryData || !genderData) {
    return <div>Loading...</div>;
  }

  const genderViews = genderData.gender_list.reduce(
    (sum, item) => sum + item.gender_number,
    0,
  );

  const gentderChartData = {
    labels: genderData.gender_list.map((data) => data.gender_name),
    datasets: [
      {
        labels: '성별 통계',
        data: genderData.gender_list.map(
          (data) => (data.gender_number / genderViews) * 100,
        ),
        fill: false,
        backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 0.5)'],
        borderWidth: 1,
      },
    ],
  };

  const countryViews = countryData.country_list.reduce(
    (sum, item) => sum + item.country_views,
    0,
  );

  const countryChartData = {
    labels: countryData.country_list.map((data) => data.country_name),
    datasets: [
      {
        label: '국가별 통계',
        data: countryData.country_list.map(
          (data) => (data.country_views / countryViews) * 100,
        ),
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(199, 199, 199, 0.5)',
          'rgba(83, 102, 255, 0.5)',
          'rgba(255, 159, 86, 0.5)',
          'rgba(135, 211, 124, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
          'rgba(255, 159, 86, 1)',
          'rgba(135, 211, 124, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const viewChartData = {
    labels: viewData?.daily_views.map((view) => view.daily_views_date),
    datasets: [
      {
        label: '일일 조회수',
        data: viewData?.daily_views.map((view) => view.daily_views_views),
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  const totalViews = ageData.age_list.reduce(
    (sum, item) => sum + item.age_views,
    0,
  );

  const viewAgeData = {
    totalViews: totalViews,

    labels: ageData?.age_list.map((view) => view.age_group),
    datasets: [
      {
        label: '연령별 통계',
        data: ageData?.age_list.map(
          (view) => (view.age_views / totalViews) * 100,
        ),
        fill: false,
        backgroundColor: 'rgba(70, 0, 190, 0.5)',
        borderColor: 'rgba(70, 0, 190, 1)',
        borderWidth: 1,
      },
    ],
  };

  const viewChartOptions = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
    layout: {
      padding: {
        top: 0,
        right: 20,
        bottom: 40,
        left: 20,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
      },
      datalabels: {
        display: false, // 명시적으로 datalabels 비활성화
      },
    },
  };

  const ageChartOptions = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14,
            callback: function (value) {
              return value + '%';
            },
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.raw + '%';
            return label;
          },
        },
      },
      legend: {
        position: 'top',
        align: 'end',
      },
      datalabels: {
        display: false, // 명시적으로 datalabels 비활성화
      },
    },
    layout: {
      padding: {
        top: 0,
        right: 20,
        bottom: 40,
        left: 20,
      },
    },
  };
  const pieDoughnut = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 14, // x축 글자 크기
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14, // y축 글자 크기
            callback: function (value) {
              return value + '%'; // y축 값을 퍼센트로 표시
            },
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.raw + '%'; // 툴팁 값을 퍼센트로 표시
            return label;
          },
        },
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value, ctx) => {
          if (value === 0 || value === null || value === undefined) {
            return null; // 값이 없으면 라벨을 표시하지 않음
          }
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
        display: (ctx) => {
          const value = ctx.dataset.data[ctx.dataIndex];
          return value > 0; // 값이 0보다 큰 경우에만 라벨 표시
        },
      },
    },
    layout: {
      padding: {
        top: 0,
        right: 20,
        bottom: 200,
        left: 20,
      },
    },
  };

  return (
    <ChartContainer>
      <Statistics>My&nbsp;Statistics</Statistics>
      <Box sx={{ width: '100%', bgcolor: 'black' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#a4a4a4', // 인디케이터 색상
            },
          }}
          sx={{
            '& .MuiTab-root': {
              color: '#a4a4a4', // 탭의 기본 글자 색상
            },
            '& .Mui-selected': {
              color: '#ffffff', // 선택된 탭의 글자 색상
            },
          }}
        >
          <Tab label="조회수 통계" />
          <Tab label="연령별 통계" />
          <Tab label="국가별 통계" />
          <Tab label="성별 통계" />
        </Tabs>
      </Box>
      <TotalBox>
        <StudioText>{viewData.member_name} 님 스튜디오</StudioText>
        <InfoBox>
          <TotalText>Total View : {viewData.total_views}</TotalText>
          {/* <TotalText>|</TotalText> */}
          <TotalText>Total Video : {viewData.total_mv}</TotalText>
          <TotalText>Most View Video: {viewData.popular_mv_subject}</TotalText>
        </InfoBox>
      </TotalBox>
      <ChartSizeSetting>
        {value === 0 && (
          <Line data={viewChartData} options={viewChartOptions} />
        )}
        {value === 1 && <Bar data={viewAgeData} options={ageChartOptions} />}
        {value === 2 && (
          <Doughnut data={countryChartData} options={pieDoughnut} />
        )}
        {value === 3 && <Pie data={gentderChartData} options={pieDoughnut} />}
      </ChartSizeSetting>
    </ChartContainer>
  );
};

export default ViewChart;
