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

  function isImageUrlValid(url: string): boolean {
    return (
      (url?.startsWith('http://') || url?.startsWith('https://')) &&
      !url?.startsWith(
        'https://seeds-bucket-new.s3.ap-southeast-3.amazonaws.com'
      )
    );
  }

  return (
    <>
      {tournament !== undefined && (
        <>
          <div className="grid grid-cols-4 gap-4 my-5">
            {isLoadingTournament ? (
              <Typography className="w-full text-base font-semibold text-center">
                Loading....
              </Typography>
            ) : tournament.length !== 0 ? (
              tournament.map((data, idx) => {
                const defaultCircle = '/assets/default-circle.png';
                const imageUrl = data?.banner ?? defaultCircle;
                const isImageValid = isImageUrlValid(imageUrl);
                return (
                  <div
                    key={idx}
                    className="relative border border-black/10 rounded-[26px] bg-[url] xl:w-full xl:h-[30vh] h-[25vh] my-4"
                  >
                    {isImageValid ? (
                      <img
                        src={`${data.banner}`}
                        alt={data.name}
                        className="absolute w-full xl:h-full h-full object-fill rounded-[26px]"
                      />
                    ) : (
                      <img
                        src={defaultCircle}
                        alt={data.name}
                        className="absolute w-full xl:h-full h-full object-fill rounded-[26px]"
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <p>Not found</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
