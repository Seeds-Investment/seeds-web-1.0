import React, { type ForwardedRef, forwardRef } from "react";
import { Input } from "react-daisyui";
import {
    type ComponentColor,
    type ComponentSize,
    type IComponentBaseProps,
} from "react-daisyui/dist/types";
import { type FieldError } from "react-hook-form/dist/types";
import ValidationError from "../validation/error";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "color"
> &
  IComponentBaseProps & {
    bordered?: boolean;
    borderOffset?: boolean;
    size?: ComponentSize;
    color?: ComponentColor;
    error?: FieldError | undefined;
  };

const CInputInner = (
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
): JSX.Element => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    target.blur();
  };

  return (
    <div className="w-full">
      <Input
        {...props}
        ref={ref}
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        className={`w-full ${props.error !== undefined ? "!border-red-400" : ""} ${props.className ?? ''}`}
        onWheel={handleWheel}
      />
      <ValidationError error={props?.error} />
    </div>
  );
};

const CInput = forwardRef(CInputInner) as (
  props: InputProps & { ref?: ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof CInputInner>;

export default CInput;
