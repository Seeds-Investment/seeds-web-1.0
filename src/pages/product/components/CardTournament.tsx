import { tournamentTop } from '@/repository/asset.repository';
import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

interface tournamentInterface {
  id: string;
  play_id: string;
  name: string;
  banner: string;
  type: string;
}
export default function CardTournament(): React.ReactElement {
  const [tournament, setTournament] = useState<tournamentInterface[]>();
  const [isLoadingTournament, setIsLoadingTournament] = useState(false);

  const fetchTopTournament = async (): Promise<void> => {
    try {
      setIsLoadingTournament(true);
      tournamentTop()
        .then(res => {
          setTournament(res.data);
          setIsLoadingTournament(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoadingTournament(false);
        });
    } catch (error: any) {
      setIsLoadingTournament(false);
      console.error('Error fetching tournament data:', error.message);
    }
  };

  useEffect(() => {
    fetchTopTournament()
      .then()
      .catch(() => {});
  }, []);

  return (
    <>
      {tournament !== undefined && (
        <>
          <div className="grid grid-rows-4 grid-flow-col gap-4 items-center justify-center my-5"></div>
          {isLoadingTournament ? (
            <Typography className="w-full text-base font-semibold text-center">
              Loading....
            </Typography>
          ) : tournament.length !== 0 ? (
            tournament.map((data, idx) => (
              <div
                key={idx}
                className="relative border border-black/10 rounded-[26px] bg-[url] xl:w-[30%] xl:h-[30vh] h-[25vh] my-4"
              >
                <img
                  src={`${data.banner}`}
                  alt={data.name}
                  className="absolute w-full xl:h-full h-full object-fill rounded-[26px] brightness-50"
                />
              </div>
            ))
          ) : (
            <p>Not found</p>
          )}
        </>
      )}
    </>
  );
}
