// components/Toast.tsx
import { Transition } from '@headlessui/react';
import { Typography } from '@material-tailwind/react';
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'errorFixed';
  show: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  show,
  onClose,
  type = 'error'
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return (): void => {
      clearTimeout(timer);
    };
  }, [show, onClose]);

  return (
    <Transition
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex justify-center">
        {type === 'error' && (
          <div className="absolute -top-20 bg-white border-l-8 rounded-md border-[#FF3838] min-w-[200px] max-w-[300px] xl:min-w-[400px] xl:max-w-[405px]">
            <div className="flex justify-start p-2 gap-4">
              <div className="flex items-center">
                <div className="p-1 rounded-full bg-[#FFEBEB]">
                  <div className="p-1 rounded-full bg-[#fcdbdb]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM11.25 7.5C11.25 7.30109 11.329 7.11032 11.4697 6.96967C11.6103 6.82902 11.8011 6.75 12 6.75C12.1989 6.75 12.3897 6.82902 12.5303 6.96967C12.671 7.11032 12.75 7.30109 12.75 7.5V12.75C12.75 12.9489 12.671 13.1397 12.5303 13.2803C12.3897 13.421 12.1989 13.5 12 13.5C11.8011 13.5 11.6103 13.421 11.4697 13.2803C11.329 13.1397 11.25 12.9489 11.25 12.75V7.5ZM12 17.25C11.7775 17.25 11.56 17.184 11.375 17.0604C11.19 16.9368 11.0458 16.7611 10.9606 16.5555C10.8755 16.35 10.8532 16.1238 10.8966 15.9055C10.94 15.6873 11.0472 15.4868 11.2045 15.3295C11.3618 15.1722 11.5623 15.065 11.7805 15.0216C11.9988 14.9782 12.225 15.0005 12.4305 15.0856C12.6361 15.1708 12.8118 15.315 12.9354 15.5C13.059 15.685 13.125 15.9025 13.125 16.125C13.125 16.4234 13.0065 16.7095 12.7955 16.9205C12.5845 17.1315 12.2984 17.25 12 17.25Z"
                        fill="#FF3838"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="text-black font-poppins text-sm">
                  {message}
                </Typography>
              </div>
            </div>
          </div>
        )}
        {type === 'errorFixed' && (
          <div className="fixed z-[1000] top-20 bg-white border-l-8 rounded-md border-[#FF3838] min-w-[200px] max-w-[300px] xl:min-w-[400px] xl:max-w-[405px]">
            <div className="flex justify-start p-2 gap-4">
              <div className="flex items-center">
                <div className="p-1 rounded-full bg-[#FFEBEB]">
                  <div className="p-1 rounded-full bg-[#fcdbdb]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM11.25 7.5C11.25 7.30109 11.329 7.11032 11.4697 6.96967C11.6103 6.82902 11.8011 6.75 12 6.75C12.1989 6.75 12.3897 6.82902 12.5303 6.96967C12.671 7.11032 12.75 7.30109 12.75 7.5V12.75C12.75 12.9489 12.671 13.1397 12.5303 13.2803C12.3897 13.421 12.1989 13.5 12 13.5C11.8011 13.5 11.6103 13.421 11.4697 13.2803C11.329 13.1397 11.25 12.9489 11.25 12.75V7.5ZM12 17.25C11.7775 17.25 11.56 17.184 11.375 17.0604C11.19 16.9368 11.0458 16.7611 10.9606 16.5555C10.8755 16.35 10.8532 16.1238 10.8966 15.9055C10.94 15.6873 11.0472 15.4868 11.2045 15.3295C11.3618 15.1722 11.5623 15.065 11.7805 15.0216C11.9988 14.9782 12.225 15.0005 12.4305 15.0856C12.6361 15.1708 12.8118 15.315 12.9354 15.5C13.059 15.685 13.125 15.9025 13.125 16.125C13.125 16.4234 13.0065 16.7095 12.7955 16.9205C12.5845 17.1315 12.2984 17.25 12 17.25Z"
                        fill="#FF3838"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="text-black font-poppins text-sm">
                  {message}
                </Typography>
              </div>
            </div>
          </div>
        )}
      </div>
    </Transition>
  );
};

export default Toast;
