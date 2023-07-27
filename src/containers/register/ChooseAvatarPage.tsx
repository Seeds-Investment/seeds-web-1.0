'use client';
import CSwitchSelect from '@/components/CSwitchSelect';
import CSwitchSelectItem from '@/components/CSwitchSelectItem';
import useFetch from '@/hooks/useFetch';
import useService from '@/hooks/useService';
import type { IRegisterPaging } from '@/pages/auth/register';
import { avatarList, registerNewUser } from '@/repository/auth.repository';
import { isEmptyString, isUndefindOrNull } from '@/utils/common/utils';
import { Button, Typography } from '@material-tailwind/react';
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

  const submit = async (): Promise<void> => {
    await post.execute({
      phoneNumber:
        formdata.countryCode.replace('+', '') +
        formdata.phoneNumber.replace(/\s/g, ''),
      email: formdata.email,
      birthDate: new Date(formdata.birthdate).toISOString(),
      name: formdata.name,
      seedsTag: formdata.seedsTag,
      refCode: formdata.referralCode,
      password: formdata.password,
      avatar: formdata.avatar,
      provider: {
        provider: formdata.providers.provider ?? '',
        identifier: formdata.providers.identifier ?? ''
      }
    });
  };
  if (
    !isUndefindOrNull(post.data) &&
    !isUndefindOrNull(post.data.accessToken)
  ) {
    window.localStorage.setItem('accessToken', post.data.accessToken);
    window.localStorage.setItem('refreshToken', post.data.refreshToken);
    window.localStorage.setItem(
      'keepMeLoggedin',
      formdata.providers.provider === '' ? 'false' : 'true'
    );
    setPage(5);
  }

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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                  className="spinner_P7sC"
                />
              </svg>
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
            submit()
              .then()
              .catch(() => {});
          }}
        >
          {post.loading ? (
            <div className="w-full flex justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                  className="spinner_P7sC"
                />
              </svg>
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
