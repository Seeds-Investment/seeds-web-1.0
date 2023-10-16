import PieAssets from '@/components/circle/pie/PieAssets';
import PieMain from '@/components/circle/pie/PieMain';
import { Dialog } from '@material-tailwind/react';
import { useState } from 'react';

interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
  }>;
}

const initialChartData = {
  labels: ['dummy'],
  datasets: [
    {
      data: [100],
      backgroundColor: ['#9F9F9F']
    }
  ]
};

interface AssetInterface {
  id: string;
  quote: string;
  currency: string;
  image: string;
  name: string;
  price: number;
  regularPercentage: number;
  value: number;
}

interface props {
  changeForm: any;
  form: any;
  setPages: any;
}

const ModalPie: React.FC<props> = ({ setPages, changeForm, form }) => {
  const [isAsset, setIsAsset] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetInterface[]>([]);
  const [chartData, setChartData] = useState<ChartData>(initialChartData);
  const [sumAsset, setSumAsset] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleOpen = (): void => {
    setPages('text');
    setIsOpen(!isOpen);
  };

  const handleAssets = (): void => {
    setIsAsset(!isAsset);
  };

  const createRandomColor = (): string => {
    const generate = Math.floor(Math.random() * 16777215).toString(16);

    return '#' + generate;
  };

  const handleChartData = (value: any): void => {
    const color = createRandomColor();

    const foundDummy = chartData.labels.includes('dummy');
    if (foundDummy) {
      setChartData({
        labels: [value.quote],
        datasets: [
          {
            data: [0],
            backgroundColor: [color]
          }
        ]
      });
    } else {
      setChartData(prevState => ({
        ...prevState,
        labels: [...chartData.labels, value.quote],
        datasets: [
          {
            ...chartData.datasets[0],
            data: [...chartData.datasets[0].data, 0],
            backgroundColor: [...chartData.datasets[0].backgroundColor, color]
          }
        ]
      }));
    }
  };

  const handleSelectedAsset = (e: any): void => {
    const target = e.target;
    const value = JSON.parse(target.value);

    if (selectedAsset.length >= 8) {
      console.error('Jumlah data maksimal telah tercapai (8)');
      return;
    }

    const isDataExist = selectedAsset.some(item => item.id === value.id);

    if (isDataExist) {
      const newData = selectedAsset.filter(item => item.id !== value.id);
      setSelectedAsset(newData);
    } else {
      handleChartData(value);
      setSelectedAsset(oldMessages => [...oldMessages, value]);
    }
  };

  const handleRemoveSelectedAsset = (index: number): void => {
    const newData = [...selectedAsset];
    newData.splice(index, 1);

    setSelectedAsset(newData);
  };

  const handleSliderAsset = (e: any, index: number): void => {
    const target = e.target;
    const newValue = Math.round(target.value);

    setChartData(prevState => {
      const updatedData = [...prevState.datasets[0].data];
      updatedData[index] = newValue;
      const total = updatedData.reduce((acc, value) => acc + value, 0);

      setSumAsset(total);
      if (total <= 100) {
        setSelectedAsset(prevState => {
          const updatedData = [...prevState];
          updatedData[index].value = newValue;

          return updatedData;
        });
        return {
          ...prevState,
          datasets: [
            {
              ...prevState.datasets[0],
              data: updatedData
            }
          ]
        };
      } else {
        console.error('Jumlah total data tidak boleh melebihi 100');
        return prevState;
      }
    });
  };

  return (
    <Dialog
      open={isOpen}
      handler={handleOpen}
      className="max-w-full w-[90%] md:w-[50%] lg:w-[40%]"
    >
      <div className="bg-white rounded-lg p-14 shadow-md relative overflow-y-auto max-h-screen">
        {isAsset ? (
          <PieAssets
            setPages={handleOpen}
            changeToAsset={handleAssets}
            selectedAsset={selectedAsset}
            handleSelectedAsset={handleSelectedAsset}
            removeSelectedAsset={handleRemoveSelectedAsset}
          />
        ) : (
          <PieMain
            setPages={handleOpen}
            chartData={chartData}
            changeToAsset={handleAssets}
            selectedAsset={selectedAsset}
            changeSlider={handleSliderAsset}
            sumAsset={sumAsset}
          />
        )}
      </div>
    </Dialog>
  );
};

export default ModalPie;
