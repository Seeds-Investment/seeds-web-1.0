import { Button } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher(): React.ReactElement {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string): void => {
    void i18n.changeLanguage(lng);
  };

  return (
    <div className="grid grid-cols-2 gap-3 w-[200px] p-3">
      <Button
        className="w-full"
        onClick={() => {
          changeLanguage('en');
        }}
      >
        EN
      </Button>
      <Button
        className="w-full"
        onClick={() => {
          changeLanguage('id');
        }}
      >
        ID
      </Button>
    </div>
  );
}
