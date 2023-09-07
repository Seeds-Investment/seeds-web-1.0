import { useState } from 'react';
import {
  Checkbox as MTCheckbox,
  Typography,
  Input,
  IconButton
} from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

interface props {
  setPages: any;
  form: any;
}

export const PollInput: React.FC<props> = ({ setPages, form }) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<string[]>([]);
  const [isMultiVote, setIsMultiVote] = useState(false);
  const [hasEndDate, setHasEndDate] = useState(false);
  const [endDate, setEndDAte] = useState('');
  const [shouldAllowNewOption, setShouldAllowNewOption] = useState(false);

  const deletePolling = (index: number): void => {
    setOptions([...options.filter((_, i) => i !== index)]);
  };

  const onDone = (): void => {
    form.polling = {
      options: options.map(option => ({ content_text: option, media_url: '' })),
      isMultiVote,
      canAddNewOption: shouldAllowNewOption,
      endDate
    };
    setPages('text');
  };

  const onCancel = (): void => {
    setPages('text');
  };

  return (
    <div className="rounded-lg border border-[#BDBDBD] w-fit my-4 p-4">
      <div>
        {options.map((value, index) => (
          <Option
            key={index}
            value={value}
            onChange={val => {
              if (val === undefined) return;
              if (val.length < 1) {
                deletePolling(index);
                return;
              }
              setOptions([
                ...options.map((e, i) => {
                  if (i === index) {
                    e = val;
                  }
                  return e;
                })
              ]);
            }}
            onButtonClick={() => {
              deletePolling(index);
            }}
          />
        ))}
        {options.length < 6 && (
          <OptionInput
            key="new"
            label={t('input.poll.optionPlaceholder', {
              index: options.length + 1
            })}
            onButtonClick={newOption => {
              setOptions([...options, newOption]);
            }}
          />
        )}
      </div>
      <div className="flex flex-col">
        <CheckBox
          checked={hasEndDate}
          onChange={() => {
            setHasEndDate(!hasEndDate);
          }}
          label={t('input.poll.endDateLabel')}
        />
        {hasEndDate && (
          <Input
            className="text-lg"
            type="date"
            size="md"
            variant="standard"
            color="gray"
            placeholder="DD/MM/YYYY"
            value={endDate}
            onChange={e => {
              setEndDAte(e.target.value);
            }}
          />
        )}
        <CheckBox
          checked={isMultiVote}
          onChange={() => {
            setIsMultiVote(!isMultiVote);
          }}
          label={t('input.poll.endDateLabel')}
        />
        <CheckBox
          checked={shouldAllowNewOption}
          onChange={() => {
            setShouldAllowNewOption(!shouldAllowNewOption);
          }}
          label={t('input.poll.allowNewOptionLabel')}
        />
      </div>
      <div className="flex">
        <button
          onClick={onCancel}
          type="button"
          className="flex w-40 mx-2 justify-center py-2 items-center rounded-full px-6 text-[#7555DA] border border-[#7555DA] font-semibold font-poppins h-fit"
        >
          Cancel
        </button>
        <button
          onClick={onDone}
          disabled={options.length < 1}
          type="button"
          className={`flex w-40 mx-2 justify-center py-2 items-center rounded-full px-6 font-semibold font-poppins h-fit ${
            options.length < 1
              ? 'bg-[#BDBDBD] text-[#7C7C7C]'
              : 'bg-seeds-button-green text-white'
          }`}
        >
          Done
        </button>
      </div>
    </div>
  );
};

interface CheckBoxProps {
  onChange: () => void;
  label: string;
  checked: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, label, checked }) => {
  return (
    <MTCheckbox
      className="p-0 m-0"
      checked={checked}
      onChange={onChange}
      label={
        <Typography variant="small" className="text-black lg:font-small">
          {label}
        </Typography>
      }
      color="green"
    />
  );
};

interface OptionProps {
  onChange: (value: string) => void;
  value: string;
  onButtonClick: () => void;
}

const Option: React.FC<OptionProps> = ({
  onChange,
  onButtonClick,
  value,
}) => {

  return (
    <div className="relative flex w-full max-w-[24rem] h-8 h-fit">
      <Input
        variant="static"
        className="h-8"
        value={value}
        onChange={e => {
          onChange(e.target.value);
        }}
        maxLength={255}
      />
      <IconButton
        size="sm"
        color={'gray'}
        className="!absolute right-1 top-3 rounded-full w-6 h-6 text-xl pb-4 bg-[#E9E9E9]"
        onClick={onButtonClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3.79102 10.8097L3.18945 10.2082L6.39779 6.99984L3.18945 3.7915L3.79102 3.18994L6.99935 6.39827L10.2077 3.18994L10.8092 3.7915L7.60091 6.99984L10.8092 10.2082L10.2077 10.8097L6.99935 7.6014L3.79102 10.8097Z"
            fill="#BDBDBD"
          />
        </svg>
      </IconButton>
    </div>
  );
};

interface OptionInputProps {
  onButtonClick: (value: string) => void;
  label: string;
}

const OptionInput: React.FC<OptionInputProps> = ({
  onButtonClick,
  label,
}) => {
  const [value, setValue] = useState('');

  return (
    <div className="relative flex w-full max-w-[24rem] h-8 h-fit">
      <Input
        variant="static"
        placeholder={label}
        className="h-8"
        value={value}
        onChange={e => {setValue(e.target.value);}}
        maxLength={255}
      />
      <IconButton
        size="sm"
        color={'gray'}
        disabled={value.length<1}
        className="!absolute right-1 top-3 rounded-full w-6 h-6 text-xl pb-4 bg-[#DCFCE4] rotate-45"
        onClick={() => {
          onButtonClick(value);
          setValue('')
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3.79102 10.8097L3.18945 10.2082L6.39779 6.99984L3.18945 3.7915L3.79102 3.18994L6.99935 6.39827L10.2077 3.18994L10.8092 3.7915L7.60091 6.99984L10.8092 10.2082L10.2077 10.8097L6.99935 7.6014L3.79102 10.8097Z"
            fill="#3AC4A0"
          />
        </svg>
      </IconButton>
    </div>
  );
};
