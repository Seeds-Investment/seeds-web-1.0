import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface Props {
  t: (key: string) => string;
  shares: string;
  bonds: string;
}

interface EntryType {
  name: string;
}

const SecuritiesChart: React.FC<Props> = ({ t, shares, bonds }) => {
  const COLORS = ['#9A76FE', '#4FE6AF'];

  const data = [
    {
      name: `${t('danamart.dashboard.shares')} ${shares}`,
      value: parseFloat(shares)
    },
    {
      name: `${t('danamart.dashboard.bonds')} ${bonds}`,
      value: parseFloat(bonds)
    }
  ];

  const renderLabel = (entry: EntryType): string => {
    return entry.name;
  };

  const [chartDimensions, setChartDimensions] = useState({
    innerRadius: 50,
    outerRadius: 90
  });

  useEffect(() => {
    const handleResize = (): void => {
      const isMobile = window.innerWidth <= 768;
      const innerRadius = isMobile ? 40 : 50;
      const outerRadius = isMobile ? 60 : 90;
      setChartDimensions({ innerRadius, outerRadius });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center relative">
      <ResponsiveContainer width={'100%'} height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={chartDimensions.innerRadius}
            outerRadius={chartDimensions.outerRadius}
            label={renderLabel}
            fill="#8884d8"
            paddingAngle={0}
            fontSize={14}
            cx={'50%'}
            cy={'50%'}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center items-center mb-4 absolute">
        <Typography className="font-poppins font-semibold text-2xl">
          {parseFloat(shares) + parseFloat(bonds)}
        </Typography>
      </div>
      <div className="flex items-center flex-wrap gap-1">
        {data.map((entry, index) => (
          <div key={index} className="flex gap-1 items-center">
            <div
              className={`w-3 h-3 rounded-full`}
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <Typography className="font-poppins font-normal text-xs">
              {entry.name.split(' ')[0]}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecuritiesChart;
