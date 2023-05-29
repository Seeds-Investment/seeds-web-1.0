import React from 'react';

export default function BgBlurr(): React.ReactElement {
  return (
    <div className="w-full min-h-screen overflow-hidden opacity-70 absolute">
      <div
        className="rounded-full bg-seeds-purple blur-[100px] bottom-0 absolute -left-[150px]"
        style={{ height: '300', width: '300' }}
      />
      <div
        className="rounded-full bg-seeds-green blur-[100px] bottom-[150px] -left-[150px] absolute"
        style={{ height: '300', width: '300' }}
      />
    </div>
  );
}
