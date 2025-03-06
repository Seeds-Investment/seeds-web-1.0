/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import ReactSelect, {
  type GroupBase,
  type OptionsOrGroups,
  components,
} from "react-select";

interface Option {
  key: number;
  label: string;
  value: string;
}

interface Props {
  options: OptionsOrGroups<any, GroupBase<Option>>;
  value?: string;
  disabled?: boolean;
  onChange: (e: Option) => void;
  rounded?: boolean;
  fullWidth?: boolean;
}

const Select = ({
  options,
  value,
  disabled = false,
  onChange,
  rounded = false,
  fullWidth = false,
}: Props): JSX.Element => {
  return (
    <ReactSelect
      value={options.find((item) => item.value === value)}
      options={options}
      isDisabled={disabled}
      onChange={onChange}
      styles={{
        control: (baseStyle) => ({
          ...baseStyle,
          padding: 5,
          borderColor: "#BDBDBD",
          borderRadius: rounded ? "50rem" : "0.5rem",
          cursor: "pointer",
        }),
      }}
      className={fullWidth ? 'w-full' : ''}
      components={{
        Option: (props) => (
          <components.Option {...props}>
            <div className="flex flex-row gap-2 items-center cursor-pointer">
              {(props.data?.icon) ? props.data?.icon() : null}
              <div>{props.data.label}</div>
            </div>
          </components.Option>
        ),
        SingleValue: (props) => (
          <components.SingleValue {...props}>
            <div className="flex flex-row gap-2 items-center cursor-pointer">
              {props.data?.icon ? props.data?.icon() : null}
              <div>{props.data.label}</div>
            </div>
          </components.SingleValue>
        ),
      }}
    />
  );
};

export default Select;
