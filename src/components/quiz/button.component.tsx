/* eslint-disable react/display-name */
import { memo } from 'react';

interface Props {
  title: string;
  darkBackground: string;
  background: string;
  onClick: () => void;
}
const QuizButton = memo<Props>(
  ({ title, darkBackground, background, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`!bg-[${darkBackground}] relative flex items-center justify-center border-2 border-white w-full h-14 rounded-full shadow-sm shadow-gray-600 drop-shadow-sm hover:opacity-90`}
        style={{ backgroundColor: darkBackground }}
      >
        <div
          className={`h-12 w-full bg-[${background}] rounded-full absolute inset-0`}
          style={{ backgroundColor: background }}
        />
        <div className="z-10 text-center text-xl font-semibold text-white">
          {title}
        </div>
      </button>
    );
  }
);

export default QuizButton;
