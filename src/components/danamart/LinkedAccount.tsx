import EmailIcon from '@/assets/danamart/email-icon.svg';
import PhoneIcon from '@/assets/danamart/phone-icon.svg';
import SeedsXDanamart from '@/assets/danamart/seeds-danamart.svg';
import BlueWarning from '@/assets/my-profile/earning/blueWarning.svg';
import { registerLog, validateExistingAccount } from '@/repository/danamart/danamart.repository';
import { type UserInfo } from '@/utils/interfaces/user.interface';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { type useRouter } from 'next/router';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

interface Props {
  t: (key: string) => string;
  router: ReturnType<typeof useRouter>;
  userInfo: UserInfo;
  setIsLinkedSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  isLinkExisting: boolean;
  setIsLinkExisting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenModalRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const LinkedAccount: React.FC<Props> = ({
  t,
  router,
  userInfo,
  setIsLinkedSuccess,
  isLinkExisting,
  setIsLinkExisting,
  setIsOpenModalLogin,
  setIsOpenModalRegister
}) => {  
  const handleConnectAccount = async (): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('email', userInfo?.email);
      formData.append('nohp', userInfo?.phoneNumber);

      const response = await validateExistingAccount(formData);

      if (response?.message === 'Account already registered') {
        void createRegisterLog();
      }
    } catch (error: any) {
      toast.error(t('danamart.register.notRegistered'))
    }
  };
  
  const createRegisterLog = async (): Promise<void> => {
    try {
      const response = await registerLog({
        email: userInfo?.email,
        phone_number: userInfo?.phoneNumber,
        type: 'individu'
      });
      if (response?.message === 'Log created successfully') {
        setIsOpenModalRegister(false)
        setIsOpenModalLogin(true)
        toast.success(t('danamart.register.connectSucceed'))
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="px-4 py-5 md:p-8 flex flex-col items-center gap-5">
      <div className="w-full relative flex justify-center">
        <div
          onClick={async () => {
            await router.push('/homepage');
          }}
          className="absolute right-0 cursor-pointer hover:scale-110 duration-150"
        >
          <IoMdClose size={20} />
        </div>
        <Image
          src={SeedsXDanamart}
          alt="SeedsXDanamart Logo"
          width={168}
          height={80}
        />
      </div>
      {
        isLinkExisting ?
          <>
            <div className="flex flex-col gap-2 text-center">
              <Typography className="font-poppins font-semibold text-xl text-[#262626]">
                {t('danamart.register.connectDanamart')}
              </Typography>
            </div>
            <div className='w-full flex justify-center items-center gap-2'>
              <Image
                src={BlueWarning}
                alt='BlueWarning'
                width={1000}
                height={1000}
                className='w-[20px] h-auto shrink-0'
              />
              <Typography className="font-poppins font-light text-base text-[#3C49D6] italic">
                {t('danamart.register.makeSure')}
              </Typography>
            </div>
            <div className="flex flex-col gap-3 md:gap-6 px-4 md:px-4 w-full">
              <div className="border border-[#e5e5e5] p-3 flex justify-between items-center gap-2 rounded-xl">
                <div className="flex items-center gap-2">
                  <Image src={EmailIcon} alt="Email Icon" width={48} height={48} />
                  <div className="flex flex-col gap-1">
                    <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                      {t('danamart.register.email')}
                    </Typography>
                    <Typography className={`${userInfo?.email !== '' ? 'text-sm font-semibold' : 'text-xs font-light'} font-poppins text-[#7c7c7c]`}>
                      {userInfo?.email !== ''
                        ? userInfo?.email
                        : t('danamart.register.notLinked')}
                    </Typography>
                  </div>
                </div>
                {userInfo?.email !== '' ? (
                  <IoMdCheckmark size={28} color="#27A590" />
                ) : (
                  <IoMdClose size={28} color="#B91C1C" />
                )}
              </div>
              <div className="border border-[#e5e5e5] p-3 flex justify-between items-center gap-2 rounded-xl">
                <div className="flex items-center gap-2">
                  <Image src={PhoneIcon} alt="Phone Icon" width={48} height={48} />
                  <div className="flex flex-col gap-1">
                    <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                      {t('danamart.register.phoneNumber')}
                    </Typography>
                    <Typography className={`${userInfo?.phoneNumber !== '' ? 'text-sm font-semibold' : 'text-xs font-light'} font-poppins text-[#7c7c7c]`}>
                      {userInfo?.phoneNumber !== ''
                        ? userInfo?.phoneNumber
                        : t('danamart.register.notLinked')}
                    </Typography>
                  </div>
                </div>
                {userInfo?.phoneNumber !== '' ? (
                  <IoMdCheckmark size={28} color="#27A590" />
                ) : (
                  <IoMdClose size={28} color="#B91C1C" />
                )}
              </div>
            </div>
            <Button
              onClick={async () => {
                userInfo?.email !== '' && userInfo?.phoneNumber !== ''
                  ? await handleConnectAccount()
                  : await router.push('/user-setting/account-security-center')
              }}
              className="w-full h-fit bg-seeds-button-green text-white font-poppins font-semibold text-base capitalize rounded-full"
            >
              {userInfo?.email !== '' && userInfo?.phoneNumber !== ''
                ? t('danamart.register.connectAccount')
                : t('danamart.register.completeData')}
            </Button>
            <Button
              onClick={async () => {
                setIsLinkExisting(false)
              }}
              className="w-full h-fit bg-seeds-button-green text-white font-poppins font-semibold text-base capitalize rounded-full mb-16 md:mb-0"
            >
              {t('danamart.register.back')}
            </Button>
          </>
          :
          <>
            <div className="flex flex-col gap-2 text-center">
              <Typography className="font-poppins font-semibold text-xl text-[#262626]">
                {t('danamart.register.connectSeeds')}
              </Typography>
              <Typography className="font-poppins font-light text-base text-[#7c7c7c]">
                {t('danamart.register.automate')}
              </Typography>
            </div>
            <div className="flex flex-col gap-3 md:gap-6 px-4 md:px-4 w-full">
              <div className="border border-[#e5e5e5] p-3 flex justify-between items-center gap-2 rounded-xl">
                <div className="flex items-center gap-2">
                  <Image src={EmailIcon} alt="Email Icon" width={48} height={48} />
                  <div className="flex flex-col gap-1">
                    <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                      {t('danamart.register.email')}
                    </Typography>
                    <Typography className="font-poppins font-light text-xs text-[#7c7c7c]">
                      {userInfo?.email !== ''
                        ? t('danamart.register.linked')
                        : t('danamart.register.notLinked')}
                    </Typography>
                  </div>
                </div>
                {userInfo?.email !== '' ? (
                  <IoMdCheckmark size={28} color="#27A590" />
                ) : (
                  <IoMdClose size={28} color="#B91C1C" />
                )}
              </div>
              <div className="border border-[#e5e5e5] p-3 flex justify-between items-center gap-2 rounded-xl">
                <div className="flex items-center gap-2">
                  <Image src={PhoneIcon} alt="Phone Icon" width={48} height={48} />
                  <div className="flex flex-col gap-1">
                    <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                      {t('danamart.register.phoneNumber')}
                    </Typography>
                    <Typography className="font-poppins font-light text-xs text-[#7c7c7c]">
                      {userInfo?.phoneNumber !== ''
                        ? `${t('danamart.register.linked')}`
                        : `${t('danamart.register.notLinked')}`}
                    </Typography>
                  </div>
                </div>
                {userInfo?.phoneNumber !== '' ? (
                  <IoMdCheckmark size={28} color="#27A590" />
                ) : (
                  <IoMdClose size={28} color="#B91C1C" />
                )}
              </div>
            </div>
            <Button
              onClick={async () => {
                userInfo?.email !== '' && userInfo?.phoneNumber !== ''
                  ? setIsLinkedSuccess(true)
                  : await router.push('/user-setting/account-security-center');
              }}
              className="w-full h-fit bg-seeds-button-green text-white font-poppins font-semibold text-base capitalize rounded-full"
            >
              {userInfo?.email !== '' && userInfo?.phoneNumber !== ''
                ? t('danamart.register.createAccountButton')
                : t('danamart.register.linkAccount')}
            </Button>
            <Button
              onClick={async () => {
                setIsLinkExisting(true)
              }}
              className="w-full h-fit bg-seeds-button-green text-white font-poppins font-semibold text-base capitalize rounded-full mb-16 md:mb-0"
            >
              {t('danamart.register.connectExisting')}
            </Button>
          </>
      }
    </div>
  );
};

export default LinkedAccount;
