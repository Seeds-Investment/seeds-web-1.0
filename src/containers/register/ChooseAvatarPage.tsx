import CSwitchSelect from '@/components/CSwitchSelect';
import CSwitchSelectItem from '@/components/CSwitchSelectItem';
import useFetch from '@/hooks/useFetch';
import useService from '@/hooks/useService';
import type { IRegisterPaging } from '@/pages/circle/auth/register';
import { avatarList, registerNewUser } from '@/repository/auth.repository';
import { isEmptyString, isUndefindOrNull } from '@/utils/common/utils';
import { Button, Spinner, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ChooseAvatarPage = ({
  setPage,
  formdata,
  setFormdata
}: IRegisterPaging): JSX.Element => {
  const { t } = useTranslation();
  const [selectedGender, setSelectedGender] = useState<string>('male');
  const [selectedAvatar, setSelectedAvatar] = useState<number>(0);

  const genderList = ['male', 'female'];

  const { data, error, loading } = useFetch(avatarList, selectedGender);

  const post = useService(registerNewUser);

  const submit = (): void => {
    void (async () => {
      await post.execute({
        phoneNumber: formdata.phoneNumber,
        email: formdata.email,
        birthDate: new Date(formdata.birthdate).toISOString(),
        name: formdata.name,
        seedsTag: formdata.seedsTag,
        refCode: formdata.referralCode,
        password: formdata.password,
        avatar: formdata.avatar
      });

      if (
        !isUndefindOrNull(post.data) &&
        !isUndefindOrNull(post.data.accessToken)
      ) {
        setPage(5);
      }
    })();
  };

  return (
    <>
      <div>
        <Typography variant="h3" color="black">
          Choose Your Avatar
        </Typography>
        <Typography variant="small" color="black">
          Create an avatar that describes yourself
        </Typography>
      </div>
      <div className="flex flex-col justify-center items-center mt-4 gap-4">
        <div className="rounded-full bg-[#DCFCE4] w-[7rem] h-[7rem] relative">
          {!isUndefindOrNull(loading) && loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner className="h-10 w-10" />
            </div>
          ) : (
            <></>
          )}
          {!isUndefindOrNull(loading) && isEmptyString(error) && !loading ? (
            <Image
              src={data?.avatars[selectedAvatar]}
              className="object-cover object-[bottom_center] rounded-full w-full h-auto"
              quality={60}
              width="0"
              height="0"
              sizes="100vw"
              alt="img-avatar"
            />
          ) : (
            <></>
          )}
        </div>
        <CSwitchSelect className="w-3/4">
          {genderList.map((gender: string, index: number) => {
            return (
              <CSwitchSelectItem
                className="font-bold"
                key={`switch-select-item-${index}`}
                isActive={selectedGender === gender}
                onClick={() => {
                  setSelectedAvatar(0);
                  setSelectedGender(gender);
                }}
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </CSwitchSelectItem>
            );
          })}
        </CSwitchSelect>
        <div className="grid grid-cols-4 gap-2  w-3/4 h-[8.5rem] overflow-y-auto bg-white rounded-xl px-1 py-2">
          {!isUndefindOrNull(data) && isEmptyString(error) ? (
            data?.avatars?.map((avatar: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`rounded-full cursor-pointer bg-[#DCFCE4] w-full h-full relative border-[#3AC4A0] ${
                    selectedAvatar === index ? 'border-2' : ''
                  }`}
                  onClick={() => {
                    setSelectedAvatar(index);
                    setFormdata(prevState => ({
                      ...prevState,
                      avatar
                    }));
                  }}
                >
                  <Image
                    src={avatar}
                    className="object-cover object-[bottom_center] rounded-full w-full h-auto"
                    quality={60}
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt="img-avatar"
                  />
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="my-8">
        <Button
          disabled={formdata.avatar === ''}
          fullWidth
          className="border bg-[#3AC4A0] rounded-full border-[#3AC4A0]"
          onClick={() => {
            submit();
          }}
        >
          {post.loading ? (
            <div className="w-full flex justify-center">
              {/* <Spinner className="h-6 w-6" /> */}
            </div>
          ) : (
            t('registerPage.nextButton')
          )}
        </Button>
      </div>
    </>
  );
};

export default ChooseAvatarPage;
