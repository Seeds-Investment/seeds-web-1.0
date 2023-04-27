import InputPassword from '@/components/InputPassword';
import { passwordRequirements } from '@/utils/common';
import type { ICreateNewPassword } from '@/utils/interfaces/form.interfaces';
import { formCreateNewPasswordSchema } from '@/utils/validations/forgotPassword.schema';
import { Button } from '@material-tailwind/react';
import { useFormik } from 'formik';
import { useState } from 'react';
const CreateNewPassword = ({
  onSubmit
}: {
  onSubmit: (value: ICreateNewPassword) => void;
}): React.ReactElement => {
  const [payload, setPayload] = useState({
    password: '',
    rePassword: ''
  });

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as HTMLInputElement;

    setPayload(c => ({ ...c, [name]: value }));
  };

  const formik = useFormik({
    initialValues: payload,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit: values => {
      onSubmit(values);
    },
    validationSchema: formCreateNewPasswordSchema
  });

  const passErrorMessage = formik.errors?.password;
  const passError = typeof passErrorMessage === 'string';
  const rePassErrorMessage = formik.errors?.password;
  const rePassError = typeof rePassErrorMessage === 'string';

  const isMatch = payload.password === payload.rePassword;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-full py-8">
        <div className="font-bold tracking-wide text-3xl">
          Create New Password
        </div>
        <br />
        <div className="font-extralight tracking-wide">
          Please create a secure password including the following criteria below
        </div>
        <br />
        <br />
        <InputPassword
          errorMessage={passErrorMessage}
          label="Enter Password"
          error={passError}
          name="password"
          onChange={onChangeHandler}
          placeholder="Please enter your password"
        />
        <br />
        <InputPassword
          errorMessage={rePassErrorMessage}
          label="Confirm Password"
          error={rePassError}
          name="rePassword"
          onChange={onChangeHandler}
          placeholder="Please confirm your password"
        />
        <br />
        <div className="font-semibold mb-1">Password Must Contain:</div>
        {passwordRequirements.map((text, idx) => (
          <div
            key={idx}
            className="flex items-center font-light tracking-wider"
          >
            <div className="h-[8px] w-[8px] bg-[#3C49D6] rounded-full mr-3" />
            <div>{text}</div>
          </div>
        ))}
        <br />
        <br />
        <Button
          type="submit"
          disabled={!isMatch}
          className="bg-seeds-button-green rounded-full w-full disabled:bg-[#BDBDBD]"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default CreateNewPassword;
