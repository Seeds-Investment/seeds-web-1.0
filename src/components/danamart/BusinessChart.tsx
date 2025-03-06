import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface Props {
  businessSector: string;
  numberOfSector: string;
}

interface RenderCustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  businessSector: string;
}

const BusinessChart: React.FC<Props> = ({ businessSector, numberOfSector }) => {
  const businessSectorArray: string[] = JSON.parse(businessSector);
  const numberOfSectorArray: number[] = JSON.parse(numberOfSector);

  const data = businessSectorArray.map((item, index) => ({
    name: item,
    value: numberOfSectorArray[index]
  }));

  const COLORS = ['#5263F9', '#FDBA22', '#4FE6AF', '#9A76FE'];

  const [chartDimensions, setChartDimensions] = useState<number>(100);

  useEffect(() => {
    const handleResize = (): void => {
      const isMobile = window.innerWidth <= 768;
      const outerRadius = isMobile ? 80 : 100;
      setChartDimensions(outerRadius);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }: RenderCustomizedLabelProps): JSX.Element => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fontSize={14}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <ResponsiveContainer width={'100%'} height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx={'50%'}
            cy={'50%'}
            labelLine={false}
            outerRadius={chartDimensions}
            label={renderCustomizedLabel}
            fontSize={12}
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
      <div className="flex items-center justify-center flex-wrap gap-1">
        {data.map((entry, index) => (
          <div key={index} className="flex gap-1 items-center">
            <div
              className={`w-3 h-3 rounded-full`}
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <Typography className="font-poppins font-normal text-xs">
              {entry.name}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessChart;
