import DeleteAccountPopUp from '@/components/popup/DeleteAccount';
import DeleteAccountReasonPopUp from '@/components/popup/DeleteAccountReason';
import RemoveLinkedAccountPopUp from '@/components/popup/RemoveAccount';
import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import {
  AppleBrand,
  FacebookBrand,
  GoogleBrand
} from '@/constants/assets/logo';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';

const LinkedAccount: React.FC = () => {
  const [removeGoogleModalShown, setRemoveGoogleModalShown] =
    useState<boolean>(false);
  const [deleteModalShown, setDeleteModalShown] = useState<boolean>(false);
  const [deleteReasonModalShown, setDeleteReasonModalShown] =
    useState<boolean>(false);

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="flex justify-center items-center">
        <CardGradient
          defaultGradient
          className="relative overflow-hidden w-full sm:w-[90%] sm:rounded-[18px] sm:h-[36rem] h-[44rem] bg-white mt-20"
        >
          <div className="flex flex-col justify-center items-center">
            <Typography className="text-xl font-bold text-black mt-5">
              Linked Account
            </Typography>
            <div className="md:w-1/2 px-4 md:px-0 flex flex-col gap-5 mt-10">
              <Typography>Accounts</Typography>
              <div className="flex flex-col gap-5">
                <div className="flex gap-2 justify-between outline-gray-300 rounded-xl  outline hover:shadow-xl transition ease-in-out hover:scale-105 bg-white z-10 p-2">
                  <div className="flex gap-2">
                    <Image
                      src={GoogleBrand.src}
                      alt={GoogleBrand.alt}
                      width={20}
                      height={20}
                      className="w-auto h-auto aspect-square"
                    />
                    <div>
                      <Typography className="text-black text-lg font-bold">
                        Google Account
                      </Typography>
                      <Typography className="text-gray-500">
                        You havent linked this account
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center ">
                    <Typography
                      variant="medium"
                      className="font-bold hover:text-lg cursor-pointer text-red-600"
                      onClick={() => {
                        setRemoveGoogleModalShown(prev => !prev);
                      }}
                    >
                      Remove
                    </Typography>
                    {removeGoogleModalShown && (
                      <RemoveLinkedAccountPopUp
                        onClose={() => {
                          setRemoveGoogleModalShown(prev => !prev);
                        }}
                        provider={'Google'}
                      />
                    )}
                    {deleteModalShown && (
                      <DeleteAccountPopUp
                        onClose={() => {
                          setDeleteModalShown(prev => !prev);
                        }}
                      />
                    )}
                    {deleteReasonModalShown && (
                      <DeleteAccountReasonPopUp
                        onClose={() => {
                          setDeleteReasonModalShown(prev => !prev);
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="flex gap-2 justify-between outline-gray-300 rounded-xl hover:shadow-xl transition ease-in-out hover:scale-105 outline bg-white z-10 p-2">
                  <div className="flex gap-2">
                    <Image
                      src={AppleBrand.src}
                      alt={AppleBrand.alt}
                      width={20}
                      height={20}
                      className="w-auto h-auto aspect-square"
                    />
                    <div>
                      <Typography className="text-black text-lg font-bold">
                        Apple Account
                      </Typography>
                      <Typography className="text-gray-500">
                        You havent linked this account
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center ">
                    <Typography
                      variant="medium"
                      className="font-bold cursor-pointer text-[#3AC4A0]"
                      onClick={() => {
                        setDeleteModalShown(prev => !prev);
                      }}
                    >
                      Add
                    </Typography>
                  </div>
                </div>
                <div className="flex gap-2 justify-between outline-gray-300 rounded-xl hover:shadow-xl transition ease-in-out hover:scale-105 outline bg-white z-10 p-2">
                  <div className="flex gap-2">
                    <Image
                      src={FacebookBrand.src}
                      alt={FacebookBrand.alt}
                      width={20}
                      height={20}
                      className="w-auto h-auto aspect-square"
                    />
                    <div>
                      <Typography className="text-black text-lg font-bold">
                        Facebook Account
                      </Typography>
                      <Typography className="text-gray-500">
                        You havent linked this account
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center ">
                    <Typography
                      variant="medium"
                      className="font-bold cursor-pointer text-[#3AC4A0]"
                      onClick={() => {
                        setDeleteReasonModalShown(prev => !prev);
                      }}
                    >
                      Add
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardGradient>
      </div>
    </PageGradient>
  );
};

export default LinkedAccount;
