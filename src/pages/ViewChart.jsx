/* eslint-disable no-useless-catch */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useUser } from '@/libs/stores/userStore';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
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
  font-size: 1.32rem;
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
  margin-top: 0.5rem;
  position: relative;
`;

const TotalText = styled.p`
  color: white;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  position: relative;
`;

const StudioText = styled.p`
  color: white;
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  position: relative;
`;

const ChartSizeSetting = styled.div`
  width: 80%;
  height: 64%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8%;
  background-color: rgba(30, 29, 29, 0.3);
  border-radius: 20px;
  border: 1px solid rgba(199, 199, 199, 0.5);
  padding: 20px;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
`;
const customCanvasBackgroundColor = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';

    // 배경 색상 설정
    ctx.fillStyle = options.color || '#99ffff';

    // 배경에 border-radius 적용
    const width = chart.width;
    const height = chart.height + 5;
    const radius = options.borderRadius || 0; // 기본값 0
    const borderWidth = options.borderWidth || 0; // 기본값 0
    const borderColor = options.borderColor || '#000'; // 기본값 검정색

    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(width - radius, 0);
    ctx.quadraticCurveTo(width, 0, width, radius);
    ctx.lineTo(width, height - radius);
    ctx.quadraticCurveTo(width, height, width - radius, height);
    ctx.lineTo(radius, height);
    ctx.quadraticCurveTo(0, height, 0, height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();

    ctx.fill();

    // 테두리 설정
    if (borderWidth > 0) {
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = borderColor;
      ctx.stroke();
    }

    ctx.restore();
  },
};

const ViewChart = () => {
  const [viewData, setViewData] = useState(null);
  const [genderData, setGenderData] = useState(null);
  const [ageData, setAgeData] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [value, setValue] = useState(0);
  const username = useUser((state) => state.username);
  console.log('username', username);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchViewData = async () => {
      try {
        const response = await getViewData(username);
        setViewData(response);
      } catch (error) {
        throw error;
      }
    };
    const fetchGenderData = async () => {
      try {
        const response = await getGenderData(username);
        setGenderData(response);
      } catch (error) {
        throw error;
      }
    };
    const fetchCountryData = async () => {
      try {
        console.log('age username', username);
        const response = await getCountriesData(username);
        setCountryData(response);
      } catch (error) {
        throw error;
      }
    };
    const fetchAgeData = async () => {
      try {
        const response = await getAgesData(username);
        setAgeData(response);
      } catch (error) {
        throw error;
      }
    };
    if (!username) {
      return;
    }
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
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
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
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 1,
        tension: 0.3,
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
        borderRadius: 7,
      },
    ],
  };

  const viewChartOptions = {
    scales: {
      x: {
        display: true,
        ticks: {
          // display: false,
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
          count: 5,
        },
        grid: {
          display: true,
          color: 'rgba(224, 218, 231, 0.206)',
          drawBorder: false,
        },
      },
    },
    layout: {
      padding: {
        top: 0,
        right: 20,
        left: 20,
      },
      margin: {
        bottom: 120,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
      },
      datalabels: {
        display: false,
      },
      customCanvasBackgroundColor: {
        color: 'rgba(30, 29, 29, 0.3)',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(199, 199, 199, 0.5)',
      },
    },
    maintainAspectRatio: false,
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
          },
          count: 5,
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
        display: false,
      },
      customCanvasBackgroundColor: {
        color: 'rgba(30, 29, 29, 0.3)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(199, 199, 199, 0.5)',
      },
    },
    layout: {
      padding: {
        top: 0,
        right: 20,
        left: 20,
      },
      margin: {
        bottom: 120,
      },
    },
    maintainAspectRatio: false,
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
      legend: {
        position: 'right',
        labels: {
          padding: 20, // 범례와 차트 사이의 간격 설정
        },
      },
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
            return null;
          }
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
        display: (ctx) => {
          const value = ctx.dataset.data[ctx.dataIndex];
          return value > 0; // 값이 0보다 큰 경우에만 라벨 표시
        },
      },
      customCanvasBackgroundColor: {
        color: 'rgba(30, 29, 29, 0.3)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(199, 199, 199, 0.5)',
      },
    },
    layout: {
      padding: {
        top: 0,
        right: 20,
        left: 20,
      },
      margin: {
        bottom: 200,
      },
    },
    maintainAspectRatio: false,
  }; // country와 gender 의 차트가 어떻게 보이는지 옵션

  return (
    <ChartContainer>
      <Statistics>My&nbsp;Statistics</Statistics>
      <Box sx={{ width: '100%', bgcolor: 'black', height: '2rem' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#a4a4a4', // 인디케이터 색상
              top: '2.7rem', // 인디케이터의 위치를 위로 조정
              height: '1px',
            },
          }}
          sx={{
            '& .MuiTabs-flexContainer': {
              bgcolor: '#05000a', // 전체 탭 컨테이너의 배경색 설정
            },
            '& .MuiTab-root': {
              color: '#a4a4a4', // 탭의 기본 글자 색상
              fontSize: '0.8rem', // 탭의 폰트 크기 설정
              bgcolor: '#05000a', // 탭의 기본 배경색 설정
              height: '2rem',
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
          <TotalText>|</TotalText>
          <TotalText>Total Video : {viewData.total_mv}</TotalText>
          <TotalText>|</TotalText>
          <TotalText>Most View Video: {viewData.popular_mv_subject}</TotalText>
        </InfoBox>
      </TotalBox>
      <ChartSizeSetting>
        {value === 0 && (
          <Line
            data={viewChartData}
            options={viewChartOptions}
            // plugins={[customCanvasBackgroundColor]}
          />
        )}
        {value === 1 && (
          <Bar
            data={viewAgeData}
            options={ageChartOptions}
            // plugins={[customCanvasBackgroundColor]}
          />
        )}
        {value === 2 && (
          <Doughnut
            data={countryChartData}
            options={pieDoughnut}
            // plugins={[customCanvasBackgroundColor]}
          />
        )}
        {value === 3 && (
          <Pie
            data={gentderChartData}
            options={pieDoughnut}
            // plugins={[customCanvasBackgroundColor]}
          />
        )}
      </ChartSizeSetting>
    </ChartContainer>
  );
};

export default ViewChart;
