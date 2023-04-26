import InputPassword from '@/components/InputPassword';
import { passwordRequirements } from '@/utils/common';
import { Button } from '@material-tailwind/react';
const CreateNewPassword = (): React.ReactElement => {
  return (
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
      <div className="font-semibold">Enter Password</div>
      <InputPassword placeholder="Please enter your password" />
      <br />
      <div className="font-semibold">Confirm Password</div>
      <InputPassword placeholder="Please confirm your password" />
      <br />
      <div className="font-semibold mb-1">Password Must Contain:</div>
      {passwordRequirements.map((text, idx) => (
        <div key={idx} className="flex items-center font-light tracking-wider">
          <div className="h-[8px] w-[8px] bg-[#3C49D6] rounded-full mr-3" />
          <div>{text}</div>
        </div>
      ))}
      <br />
      <br />
      <Button
        disabled
        className="bg-seeds-button-green rounded-full w-full disabled:bg-[#BDBDBD]"
      >
        Continue
      </Button>
    </div>
  );
};

export default CreateNewPassword;
