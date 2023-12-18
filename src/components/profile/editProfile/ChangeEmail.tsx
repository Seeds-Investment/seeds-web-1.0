import ChangeEmailEdit from '@/assets/my-profile/editProfile/ChangeEmailEdit.svg';
import { checkEmail } from '@/repository/auth.repository';
import { editUserInfo } from '@/repository/profile.repository';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import Image from 'next/image';
interface Form {
  form: any;
  setForm: any;
}

const ChangeEmail: React.FC<Form> = ({ form, setForm }: Form) => {
  const changeData = (e: any): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await checkEmail(form.email);
      const updatedForm: any = { ...form };
      await editUserInfo(updatedForm);
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };
  return (
    <div className="flex justify-center">
      <Card className="flex items-center w-[947px] h-[721px] py-5">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between items-center w-[600px] h-full p-4"
        >
          <div className="flex flex-col items-center gap-8 w-full">
            <Typography className="font-poppins font-semibold text-[#262626] text-base text-center">
              Change Email Address <br />
              <span className="font-poppins font-normal text-sm text-[#7C7C7C] text-center">
                All information from Seeds will be moved to your new email
                address.
              </span>
            </Typography>
            <Image src={ChangeEmailEdit} alt="ChangeEmailEdit" />
            <Input
              label="Your New Email"
              name="email"
              value={form.email}
              onChange={changeData}
              variant="static"
              labelProps={{
                className: 'text-base text-[#262626] font-semibold font-poppins'
              }}
              className="text-[#7C7C7C] text-base font-poppins font-normal"
              required
            />
          </div>
          <Button
            className="capitalize w-full rounded-full font-poppins font-semibold text-sm bg-[#3AC4A0]"
            type="submit"
          >
            Change
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ChangeEmail;
