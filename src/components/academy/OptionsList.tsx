import React from 'react';

interface OptionsListProps {
  options: string[];
}

const OptionsList: React.FC<OptionsListProps> = ({ options }) => {
  return (
    <div className="text-lg flex flex-col gap-5">
      {options.map((option, index) => (
        <div key={index} className="p-3 bg-white rounded-xl">
          {option}
        </div>
      ))}
    </div>
  );
};

export default OptionsList;
