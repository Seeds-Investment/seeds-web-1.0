import InputPassword from '@/components/InputPassword';
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
      <br />
      <div className="font-semibold">Enter Password</div>
      <InputPassword />
      <br />
      <div className="font-semibold">Confirm Password</div>
      <InputPassword />
    </div>
  );
};

export default CreateNewPassword;
