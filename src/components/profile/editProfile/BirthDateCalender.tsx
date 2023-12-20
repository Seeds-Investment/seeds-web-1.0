import { Input } from '@material-tailwind/react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-datepicker/dist/react-datepicker.css';

interface BirthDate {
  wrapperClassName?: string;
  className?: string;
  birthDate: any;
}

const BirthDateCalender: React.FC<BirthDate> = ({
  wrapperClassName,
  className,
  birthDate
}: BirthDate) => {
  const [finalDate, setDate] = useState(new Date(birthDate));
  console.log(finalDate);
  const [showMonth, setMonth] = useState(false);
  const [showYear, setYear] = useState(true);
  const [shouldClose, setClose] = useState(false);
  const handleChangeCalender = (): void => {
    if (showYear) {
      setMonth(!showMonth);
      setYear(!showYear);
    } else if (showMonth) {
      setMonth(!showMonth);
      setClose(!shouldClose);
    }
  };
  const handleResetCalender = (): void => {
    setYear(true);
    setClose(false);
  };
  return (
    <DatePicker
      selected={finalDate}
      onChange={(date: Date) => {
        setDate(date);
      }}
      showYearPicker={showYear}
      showMonthYearPicker={showMonth}
      onSelect={handleChangeCalender}
      onInputClick={handleResetCalender}
      shouldCloseOnSelect={shouldClose}
      dateFormat="dd/MM/yyyy"
      required
      wrapperClassName={`${wrapperClassName as string}`}
      className={`${className as string}`}
      showPopperArrow={false}
      popperPlacement="top"
      customInput={
        <Input
          label="Date of Birth"
          name="birthDate"
          variant="static"
          labelProps={{
            className: 'text-base text-[#262626] font-semibold font-poppins'
          }}
          className="text-[#7C7C7C] text-base font-poppins font-normal"
          style={{ backgroundColor: 'transparent' }}
        />
      }
    />
  );
};

export default BirthDateCalender;
