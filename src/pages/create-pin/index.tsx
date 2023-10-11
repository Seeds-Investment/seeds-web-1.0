import FinalModalCircle from '@/components/circle/FinalModalCircle';
import InputPin from '@/components/forms/InputPin';
import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { Eye, EyeSlash, successCircleSetting } from '@/constants/assets/icons';
import withAuth from '@/helpers/withAuth';
import useWindowInnerHeight from '@/hooks/useWindowInnerHeight';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { loginPhoneNumber } from '@/repository/auth.repository';
import { createPin, getUserInfo } from '@/repository/profile.repository';
import { Button, Input } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  ArrowBackwardIcon,
  IconCreatePinInputPassword
} from 'public/assets/vector';
import { useEffect, useState } from 'react';

const customGradient = (
  <>
    <span className="z-0 fixed bottom-10 -left-10 w-60 h-48 bg-seeds-green blur-[90px] rotate-45" />
    <span className="z-0 fixed bottom-0 left-0 w-24 h-24 bg-seeds-green blur-[90px]" />
    <span className="z-0 fixed -bottom-28 left-16 w-48 h-32 bg-seeds-purple-2 blur-[90px] rotate-45" />
    <span className="z-0 fixed top-64 -right-4 w-60 h-48 bg-seeds-green blur-[90px] rotate-45 rounded-full" />
    <span className="z-0 fixed bottom-36 right-0 w-32 h-32 bg-seeds-purple-2 blur-[90px] rotate-90 rounded-full" />
  </>
);

interface FormCheckPassword {
  phoneNumber: string;
  password: string;
}

interface FormCreatePin {
  pin: any;
  old_pin: '';
}

const initialFormCheckPassword = {
  phoneNumber: '',
  password: ''
};

const CreatePin = (): JSX.Element => {
  const width = useWindowInnerWidth();
  const height = useWindowInnerHeight();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formCheckPassword, setFormCheckPassword] = useState<FormCheckPassword>(
    initialFormCheckPassword
  );
  const [formCreatePin, setFormCreatePin] = useState<FormCreatePin>({
    pin: [],
    old_pin: ''
  });
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [step, setStep] = useState<string>('password');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const cancelHandler = (): void => {
    router.back();
  };

  const handleChangeValue = (event: any): void => {
    const target = event.target;
    const value = target.value;

    setFormCheckPassword(prevState => ({
      ...prevState,
      password: value
    }));
  };

  const handleAddPin = (value: string): void => {
    setFormCreatePin(prevState => ({
      ...prevState,
      pin: [...prevState.pin, value]
    }));
  };

  const handleRemovePin = (): void => {
    setFormCreatePin(prevState => ({
      ...prevState,
      pin: prevState.pin.slice(0, formCreatePin.pin.length - 1)
    }));
  };

  const fetchUserData = async (): Promise<void> => {
    try {
      getUserInfo()
        .then(res => {
          setFormCheckPassword(prevState => ({
            ...prevState,
            phoneNumber: res.phoneNumber
          }));
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error: any) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const SubmitCheckPassword = async (): Promise<void> => {
    try {
      if (formCheckPassword.password === '') {
        setErrorPassword('Password Required');
      } else {
        setErrorPassword('');
      }

      loginPhoneNumber(formCheckPassword)
        .then(res => {
          if (res.status === 401) {
            setErrorPassword('Wrong Password');
          } else {
            setStep('pin');
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error: any) {
      console.error('Error fetching circle data:', error.message);
    }
  };

  const SubmitCreatePin = async (): Promise<void> => {
    try {
      formCreatePin.pin = formCreatePin.pin.join('');

      createPin(formCreatePin)
        .then(res => {
          if (res.status === 401) {
            setErrorPassword('Wrong Password');
          } else {
            setIsSuccess(true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error: any) {
      console.error('Error submit pin:', error.message);
    }
  };

  const handleSubmit = (): void => {
    console.log('lajnsdlaksd');
  };

  useEffect(() => {
    fetchUserData()
      .then()
      .catch(() => {});

    if (formCreatePin.pin.length === 6) {
      void SubmitCreatePin();
    }
  }, [formCreatePin.pin]);

  return (
    <>
      {step === 'password' ? (
        <PageGradient
          customGradient={customGradient}
          className="z-0 relative overflow-hidden flex flex-col items-center"
        >
          <button
            onClick={cancelHandler}
            className="sm:hidden mr-auto ml-6 mb-2 pr-4 rounded-md hover:bg-gray-200 active:bg-gray-300 focus:outline-0 focus:bg-gray-200 transition-colors duration-300"
          >
            <Image src={ArrowBackwardIcon} alt="arrow-backward-icon" />
          </button>

          <CardGradient
            defaultGradient={width !== undefined && width > 640}
            extraClasses={`w-full sm:rounded-[18px] sm:h-[36rem] ${
              height !== undefined && height >= 860
                ? 'h-[44rem]'
                : height !== undefined && height < 750
                ? 'h-[35rem]'
                : 'h-[40rem]'
            } bg-white`}
          >
            <div
              className={`z-10 flex flex-col justify-between lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-full mx-auto sm:p-4 px-4 bg-white`}
            >
              <div>
                <h6
                  className={`mb-2 text-center font-poppins font-semibold ${
                    height !== undefined && height < 760
                      ? 'text-sm'
                      : 'text-base'
                  }`}
                >
                  Create Pin
                </h6>
                <p
                  className={`mb-8 text-center font-poppins ${
                    height !== undefined && height < 760 ? 'text-xs' : 'text-sm'
                  } text-neutral-soft`}
                >
                  Please input your password
                  {width !== undefined && width >= 640 ? <br /> : ' '}
                </p>
                <Image
                  priority
                  src={IconCreatePinInputPassword}
                  alt="input user email"
                  className="z-10 mx-auto mb-14"
                />

                <label className="font-semibold text-base text-[#262626]">
                  Password
                </label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  variant="standard"
                  color="green"
                  placeholder="Please input your password"
                  icon={
                    <Image
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      src={showPassword ? Eye.src : EyeSlash.src}
                      alt={showPassword ? Eye.alt : EyeSlash.alt}
                      width={24}
                      height={24}
                    />
                  }
                  onChange={handleChangeValue}
                  value={formCheckPassword.password}
                  error={errorPassword !== ''}
                />
                {errorPassword !== '' && (
                  <small className="text-[#ff515d] font-bold">
                    {errorPassword}
                  </small>
                )}

                <Button
                  className="w-full items-center justify-center mt-16 font-semibold text-sm bg-seeds-button-green rounded-full capitalize"
                  onClick={SubmitCheckPassword}
                >
                  Continue
                </Button>
              </div>
            </div>
          </CardGradient>
        </PageGradient>
      ) : step === 'pin' ? (
        <InputPin
          formRequest={formCreatePin}
          enterPinHandler={handleAddPin}
          onCancel={() => {
            setStep('password');
          }}
          deletePinHandler={handleRemovePin}
          title="Create Your Pin"
          subtitle="Please enter your PIN number correctly"
        />
      ) : null}

      {isSuccess ? (
        <FinalModalCircle
          button="Done"
          title="Success!"
          subtitle="Congratulations, you have successfully create your PIN."
          imageUrl={successCircleSetting.src}
          handleOpen={handleSubmit}
          error={false}
          redirect="/user-setting"
        />
      ) : null}
    </>
  );
};

export default withAuth(CreatePin);
