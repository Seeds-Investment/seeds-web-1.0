interface InputProps {
  label?: string;
  placeholder?: string;
  width?: string;
  margin?: string;
  isError?: boolean;
  errorMessage?: string;
  errorClasses?: string;
  className?: string;
  style?: object;
  props?: object;
}

const Input: React.FC<InputProps> = ({
  label = 'Your New Email',
  placeholder = 'example@mail.com',
  width = '',
  margin = '',
  isError,
  errorMessage,
  errorClasses,
  className,
  style,
  ...props
}) => {
  const defaultInputClasses = `relative h-11 ${width} ${margin}`;

  return (
    <div className={className ?? defaultInputClasses} style={style}>
      <input
        {...props.props}
        placeholder={placeholder}
        className="peer h-full w-full border-b border-neutral-ultrasoft bg-transparent py-1.5 font-sans text-base text-neutral-soft outline outline-0 transition-all placeholder-shown:border-neutral-ultrasoft focus:border-seeds-button-green/80 focus:outline-0 disabled:border-0 disabled:bg-neutral-ultrasoft/10 disabled:cursor-not-allowed"
      />
      <label className="after:content[' '] pointer-events-none absolute left-0 -top-6 flex h-full w-full select-none text-base font-semibold leading-6 text-neutral-medium transition-all after:absolute after:-bottom-6 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-seeds-button-green/80 after:transition-transform after:duration-300 peer-placeholder-shown:leading-6 peer-placeholder-shown:text-neutral-medium peer-focus:text-base peer-focus:leading-6 peer-focus:text-seeds-button-green/80 peer-focus:after:scale-x-100 peer-focus:after:border-seeds-button-green/80 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-neutral-medium">
        {label}
      </label>
      {isError === true && (
        <p className={errorClasses ?? 'mt-1 text-xs text-warning-hard'}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
