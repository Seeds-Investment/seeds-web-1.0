import { Card, Typography } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';

interface VariableOTP {
  select: any;
}
const ValidateOTP: React.FC<VariableOTP> = ({ select }: VariableOTP) => {
  const [inputs, setInputs] = useState(['', '', '', '']);
  const inputRefs = useRef<any[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string): void => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    if (newInputs[index] !== '') {
      inputRefs.current[index + 1]?.focus();
    } else if (newInputs[index] === '') {
      console.log(index);
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <div className={`${select === 2 ? 'flex' : 'hidden'} justify-center`}>
      <Card className="flex items-center w-[947px] h-[721px] py-5">
        <form className="flex flex-col justify-between items-center w-[600px] h-full p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col gap-2">
              <Typography className="font-poppins font-semibold text-3xl text-[#262626] text-center">
                Enter Your PIN
              </Typography>
              <Typography className="font-poppins font-normal text-base text-[#7C7C7C] text-center">
                Please enter your PIN number correctly
              </Typography>
            </div>
          </div>
          <div>
            {inputs.map((value, index) => (
              <input
                key={index}
                ref={el => (inputRefs.current[index] = el)}
                value={value}
                maxLength={1}
                onChange={e => {
                  handleChange(index, e.target.value);
                }}
                className="focus:border-none"
              />
            ))}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ValidateOTP;
