import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const TweetChart = ({ tweetCounts }) => {
    // Extract the dates and tweet counts from the tweetCounts object
    const dates = Object.keys(tweetCounts);
    const counts = Object.values(tweetCounts);
  
    // Define the chart data and options
    const data = {
      labels: dates,
      datasets: [
        {
          label: 'Tweet Counts',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          precision: 0,
        },
      },
    };
  
    return <Line data={data} options={options} />;
  };
  
  export default TweetChart;