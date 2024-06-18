import React, { useState } from 'react';

const ShortDescription: React.FC<{ text: string }> = ({ text }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const shortText = text.slice(0, 250);

  return (
    <>
      {showFullDescription ? text : shortText}
      <span
        className="text-[#3AC4A0] cursor-pointer underline decoration-solid decoration-[#3AC4A0] underline-offset-2 ps-2 break-words"
        onClick={() => {
          setShowFullDescription(prev => !prev);
        }}
      >
        {showFullDescription ? 'Show Less' : 'More Detail'}
      </span>
    </>
  );
};

export default ShortDescription;
