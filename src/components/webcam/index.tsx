import React, { useRef } from 'react';
import Webcam from 'react-webcam';

interface CustomWebcamProps {
  width: number;
  height: number;
}

const CustomWebcam: React.FC<CustomWebcamProps> = ({ width, height }) => {
  const webcamRef = useRef<Webcam | null>(null);

  return (
    <div className="relative rounded-b-2xl">
      <Webcam
        style={{ borderRadius: '0 0 16px 16px' }}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: 'user',
          width,
          height,
          aspectRatio: width / height
        }}
        className="w-full h-full md:w-[940px] md:h-[440px]"
      />
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-16 rounded-full bg-transparent border-4 border-white flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomWebcam;
