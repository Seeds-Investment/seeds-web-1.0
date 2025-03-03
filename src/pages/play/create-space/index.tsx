import CardGameSpace from '@/components/play/CardGameSpace';
import UseListGameDecentralize from '@/hooks/plays/GameDecentralize/UseListGameDecentralize';
import { Typography } from '@material-tailwind/react';

const ListOfGameSpacesPage = (): React.ReactElement => {
  const { listGame } = UseListGameDecentralize();

  return (
    <div className="flex flex-col bg-white px-6 py-6 gap-6">
      <Typography className="font-bold text-2xl">Choose Your Game</Typography>
      <div className=" grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-6 justify-start ">
        {listGame.map((game, index) => {
          return <CardGameSpace key={index} data={game} maxWidth="w-full" />;
        })}
      </div>
    </div>
  );
};
export default ListOfGameSpacesPage;
