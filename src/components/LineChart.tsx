import { formatNumber } from '@/helpers/currency';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

interface LineChartProps {
  data: any;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const dataChart = {
    labels: data?.priceBarHistory
      .slice(0, 6)
      .map((bar: any) => moment(bar.timestamp).format('MMMM')),
    datasets: [
      {
        label: 'Guest Top Lists',
        data: data?.priceBarHistory.slice(0, 6).map((bar: any) => bar.open),
        fill: true,
        borderColor: '#3AC4A0',
        backgroundColor: '#3AC4A080',
        pointBackgroundColor: Array(6).fill('#3AC4A080')
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    color: '#424242',
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          callback: (label: any) => formatNumber(label)
        }
      }
    }
  };

  return <Line data={dataChart} options={options} />;
};

export default LineChart;
