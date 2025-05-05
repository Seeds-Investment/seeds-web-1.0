import MInput from '@/components/form-input/multi-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface FormData {
  name: string;
  email: string;
  number: number;
}
const Dev = (): React.ReactElement => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    number: yup.number().required(),
    email: yup.string().email().required()
  });

  const { register, control, watch, handleSubmit } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: { name: '', email: '', number: 0 }
  });

  const submit = async (data: FormData): Promise<void> => {
    await fetch(
      'https://script.google.com/macros/s/AKfycbx5nRuxwc51vg8i88uymdwv5BISqhyRrO6XwdrvIO3ekSK_vwMa1HJoRr7u1uuVWO1MgA/exec',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(data)
      }
    );
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
      <p className="font-poppins font-semibold text-2xl">Form Title</p>
      <div className="flex flex-col gap-2">
        <MInput
          type="text"
          register={register}
          registerName="name"
          label="Name"
          className="focus:outline-none"
        />
        <MInput
          type="email"
          register={register}
          registerName="email"
          label="Email"
          className="focus:outline-none"
        />
        <MInput
          type="number"
          control={control}
          watch={watch}
          registerName="number"
          label="Number"
        />
      </div>
      <Button type="submit" className="capitalize rounded-full bg-seeds-button-green">
        Submit
      </Button>
    </form>
  );
};

export default Dev;
