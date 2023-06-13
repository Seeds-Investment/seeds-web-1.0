import { useState } from 'react';

import Image from 'next/image';
import ID from 'public/assets/images/flags/ID.png';
import US from 'public/assets/images/flags/US.png';

import Button from '../ui/button/Button';
import Logo from '../ui/vector/Logo';

import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';

const Header: React.FC = () => {
  const width = useWindowInnerWidth();

  const [language, setLanguage] = useState('EN');

  return (
    <header className="sm:pt-6 pt-12">
      <div className="document-header">
        <Logo
          width={width !== undefined && width <= 640 ? '62.22' : undefined}
          height={width !== undefined && width <= 640 ? '23.58' : undefined}
        />
        <div className="flex items-center gap-4">
          <button
            className={`transition-all duration-300 flex sm:justify-evenly sm:pl-0 pl-2.5 items-center sm:w-[5.5rem] w-[3.375rem] h-7 sm:h-11 rounded-full bg-gray-100 ${
              language === 'ID' ? 'border border-seeds-purple' : ''
            }`}
            onClick={() => {
              setLanguage('ID');
            }}
          >
            <span
              className={`font-poppins sm:text-lg text-sm ${
                language === 'ID'
                  ? 'sm:font-semibold text-seeds-purple'
                  : 'text-black'
              }`}
            >
              ID
            </span>
            {width !== undefined && width > 640 && (
              <Image src={ID} alt="ID-flag" />
            )}
          </button>
          <div className="w-px sm:h-6 h-3.5 border border-black" />
          <button
            className={`transition-all duration-300 flex sm:justify-evenly sm:pl-0 pl-2.5 items-center sm:w-[5.5rem] w-[3.375rem] h-7 sm:h-11 rounded-full bg-gray-100 ${
              language === 'EN' ? 'border border-seeds-purple' : ''
            }`}
            onClick={() => {
              setLanguage('EN');
            }}
          >
            <span
              className={`font-poppins sm:text-lg text-sm ${
                language === 'EN'
                  ? 'sm:font-semibold text-seeds-purple'
                  : 'text-black'
              }`}
            >
              EN
            </span>
            {width !== undefined && width > 640 && (
              <Image src={US} alt="US-flag" />
            )}
          </button>
          <Button
            color="dark"
            label="Join Us"
            containerClasses="sm:w-[5.7rem] w-[4.5rem] h-7 sm:h-11 rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
