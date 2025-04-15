import { changePassword } from "@/repository/danamart/setting.repository";
import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.setting.changePassword';

  const [oldPassword, setOldPassword] = useState<string>("");
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [oldPasswordError, setOldPasswordError] = useState<string | null>(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState<string | null>(null);

  const toggleOldPasswordVisibility = (): void => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = (): void => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmNewPasswordVisibility = (): void => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const validatePassword = (): boolean => {
    let valid = true;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    setNewPasswordError(null);
    setConfirmNewPasswordError(null);

    if (!passwordRegex.test(newPassword)) {
      setNewPasswordError(t(`${pathTranslation}.text8`));
      valid = false;
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError(t(`${pathTranslation}.text9`));
      valid = false;
    }

    return valid;
  };

  const handleChangePassword = async (): Promise<void> => {
    if (!validatePassword()) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('passwordLama', oldPassword);
      formData.append('passwordBaru', newPassword);
      formData.append('repassword', confirmNewPassword);
      const response = await changePassword(formData);

      if (response?.status === 200) {
        toast.success(t(`${pathTranslation}.text6`));
        setOldPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
      }
    } catch (error: any) {
      if (error?.response?.data?.messages?.error === 'Password lama salah/tidak sesuai.') {
        setOldPasswordError(t(`${pathTranslation}.text7`))
      } else {
        toast.error(`Error changing password: ${error as string}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-6 mb:mt-8 mb-2">
      <Typography className="font-poppins md:text-xl text-lg font-semibold text-[#262626] mb-4">
        {t(`${pathTranslation}.text1`)}
      </Typography>

      {/* Old Password */}
      <div className="relative w-full md:w-1/2 md:pr-2">
        <label className="block text-md font-medium text-gray-700 mb-1 font-poppins">
          {t(`${pathTranslation}.text2`)}
        </label>
        <input
          type={showOldPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => { setOldPassword(e.target.value); }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={`${t(`${pathTranslation}.text10`)}`}
        />
        <button
          type="button"
          onClick={toggleOldPasswordVisibility}
          className="absolute top-9 right-3 text-gray-500"
        >
          {showOldPassword ? <FiEyeOff className="h-5 w-5 md:mr-2" /> : <FiEye className="h-5 w-5 md:mr-2" />}
        </button>
        {(oldPasswordError !== null) && (
          <p className="text-sm text-red-500 mt-1 font-poppins">{oldPasswordError}</p>
        )}
      </div>

      {/* New and Confirm Password */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="relative w-full">
          <label className="block text-md font-medium text-gray-700 mb-1 font-poppins">
            {t(`${pathTranslation}.text3`)}
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => { setNewPassword(e.target.value); }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`${t(`${pathTranslation}.text11`)}`}
          />
          <button
            type="button"
            onClick={toggleNewPasswordVisibility}
            className="absolute top-9 right-3 text-gray-500"
          >
            {showNewPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
          </button>
          {(newPasswordError !== null) && (
            <p className="text-sm text-red-500 mt-1 font-poppins">{newPasswordError}</p>
          )}
        </div>

        <div className="relative w-full">
          <label className="block text-md font-medium text-gray-700 mb-1 font-poppins">
            {t(`${pathTranslation}.text4`)}
          </label>
          <input
            type={showConfirmNewPassword ? "text" : "password"}
            value={confirmNewPassword}
            onChange={(e) => { setConfirmNewPassword(e.target.value); }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`${t(`${pathTranslation}.text12`)}`}
          />
          <button
            type="button"
            onClick={toggleConfirmNewPasswordVisibility}
            className="absolute top-9 right-3 text-gray-500"
          >
            {showConfirmNewPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
          </button>
          {(confirmNewPasswordError !== null) && (
            <p className="text-sm text-red-500 mt-1 font-poppins">{confirmNewPasswordError}</p>
          )}
        </div>
      </div>

      {/* Password Policy Info */}
      <div
        className="font-poppins mt-2"
        dangerouslySetInnerHTML={{
          __html: t("danamart.setting.changePassword.passwordPolicy") ?? "",
        }}
      />

      {/* Submit Button */}
      <div className="w-full flex justify-center md:justify-start mb-16 md:mb-0">
        <Button
          onClick={handleChangePassword}
          disabled={isLoading || (oldPassword === '' || newPassword === '' || confirmNewPassword === '')}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-md disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.text5`)}
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
