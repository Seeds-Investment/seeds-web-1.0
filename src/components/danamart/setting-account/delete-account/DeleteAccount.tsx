import { decryptResponse } from "@/helpers/cryptoDecrypt";
import { postDeleteAccountRequest } from "@/repository/danamart/setting.repository";
import { Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import ModalOTP from "./ModalOTP";

const DeleteAccount: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathTranslation = 'danamart.setting.deleteAccount';
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isShowOTP, setIsShowOTP] = useState<boolean>(false);
  const [isContinueProcess, setIsContinueProcess] = useState<boolean>(false);
  const [passedOTP, setPassedOTP] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCloseModal, setIsCloseModal] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };
  
  const handleDeleteAccount = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const formData = new FormData();
      formData.append('otp', passedOTP);
      const response = await postDeleteAccountRequest(formData);
      
      if (response?.status === 200) {
        const encryptedData = response?.data;
        const decryptedData = decryptResponse(encryptedData);

        if (decryptedData !== null) {
          const decryptedDataObject = JSON.parse(decryptedData);
          if (decryptedDataObject?.message === 'Berhasil menghapus akun') {
            toast.success(decryptedDataObject?.message);
          } else {
            toast.success(decryptedDataObject?.message);
          }
        }
      }
      
    } catch (error: any) {
      setIsLoading(false)
      toast.error(`Error deleting account: ${error as string}`);
    } finally {
      setIsLoading(false);

      setTimeout(() => {
        void (async () => {
          setIsCloseModal(true);
          window.localStorage.removeItem('accessToken-danamart');
          await router.push('/danamart');
        })();
      }, 3000);
    }
  };
  
  useEffect(() => {
    if (isContinueProcess) {
      void handleDeleteAccount()
    }
  }, [isContinueProcess])

  return (
    <div className="flex flex-col gap-4 mt-6 mb:mt-8 mb-2">
      <Typography className="font-poppins md:text-xl text-lg font-semibold text-[#262626] mb-4">
        {t(`${pathTranslation}.text1`)}
      </Typography>

      <div
        className="font-poppins"
        dangerouslySetInnerHTML={{
          __html: t("danamart.setting.deleteAccount.disclaimer") ?? "",
        }}
      />

      <div className="relative mt-4">
        <label className="block text-md font-medium text-gray-700 mb-1 font-poppins">
          {t(`${pathTranslation}.text2`)}
        </label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => { setPassword(e.target.value); }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="********"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-9 right-3 text-gray-500"
        >
          {showPassword ? (
            <FiEyeOff className="h-5 w-5" />
          ) : (
            <FiEye className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {/* Continue Button */}
      <div className="w-full mt-6 flex justify-center md:justify-start">
        <Button
          onClick={() => {
            setIsShowOTP(true)
          }}
          disabled={password === '' || isLoading}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.text3`)}
        </Button>
      </div>
      
      {isShowOTP && (
        <ModalOTP
          setIsShowOTP={setIsShowOTP}
          isShowOTP={isShowOTP}
          setIsContinueProcess={setIsContinueProcess}
          setPassedOTP={setPassedOTP}
          isLoading={isLoading}
          password={password}
          isCloseModal={isCloseModal}
        />
      )}
    </div>
  );
};

export default DeleteAccount;
