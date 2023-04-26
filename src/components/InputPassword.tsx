import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@material-tailwind/react';
import React, { useState } from 'react';

const InputPassword = (props?: any): React.ReactElement => {
  const [isFocused, setIsFocused] = useState(false);
  const [password, setpassword] = useState(true);
  const [value, setValue] = useState('');

  const onChangeHandler = (e: any): any => {
    Boolean(props?.onChange) && props?.onChange(e);
    setValue(e.target.value);
  };

  return (
    <Input
      {...props}
      onChange={onChangeHandler}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      className={`placeholder:text-gray-600 transition-none placeholder:tracking-wider placeholder:text-base text-black ${
        password && Boolean(value?.length > 0) ? 'text-[4rem]' : 'text-[1.2rem]'
      }`}
      color="green"
      shrink={true}
      placeholder={isFocused ? '' : 'Please enter your password'}
      variant="standard"
      type={password ? 'password' : 'text'}
      icon={
        <FontAwesomeIcon
          onClick={() => {
            setpassword(c => !c);
          }}
          icon={password ? faEye : faEyeSlash}
        />
      }
    />
  );
};

export default InputPassword;
