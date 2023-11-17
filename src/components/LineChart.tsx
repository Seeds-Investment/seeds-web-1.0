import { formatNumber } from '@/helpers/currency';
import { Chart as ChartJS, registerables } from 'chart.js';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

interface LineChartProps {
  data: any;
  filter: string;
}

ChartJS.register(...registerables);

const getGradient = (ctx: any, chartArea: any): any => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  gradient.addColorStop(0.9, '#3AC4A0');
  gradient.addColorStop(0, '#FFFFFF');
  return gradient;
};

const LineChart: React.FC<LineChartProps> = ({ data, filter }) => {
  // const labels_dummy = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  // const data_dummy = [0, 0, 0, 0, 0, 0];

  const handleLable = (value: string): any => {
    if (value === 'daily') {
      return data?.priceBarHistory
        .slice(0, 6)
        .map((bar: any) => moment(bar.timestamp).format('hh:mm A'));
    }

    if (value === 'weekly') {
      return data?.priceBarHistory
        .slice(0, 6)
        .map((bar: any) => moment(bar.timestamp).format('dddd'));
    }

    if (value === 'monthly') {
      return data?.priceBarHistory
        .slice(0, 6)
        .map((bar: any) => moment(bar.timestamp).format('MMM YY'));
    }

    if (value === 'yearly') {
      return data?.priceBarHistory
        .slice(0, 6)
        .map((bar: any) => moment(bar.timestamp).format('YYYY'));
    }

    if (value === 'alltime') {
      return data?.priceBarHistory
        .slice(0, 6)
        .map((bar: any) => moment(bar.timestamp).format('YYYY'));
    }
  };

  const dataChart = {
    labels: handleLable(filter),
    datasets: [
      {
        label: 'Price Bar',
        data: data?.priceBarHistory.slice(0, 6).map((bar: any) => bar.close),
        fill: true,
        borderColor: '#3AC4A0',
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (chartArea == null) return;
          return getGradient(ctx, chartArea);
        }
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
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
