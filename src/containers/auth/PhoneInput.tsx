import { Input } from '@material-tailwind/react';
import Image from 'next/image';

interface PhoneInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: {
    phoneNumber: string;
    password: string;
  };
  displayPhoneCountry: boolean;
  setDisplayPhoneCountry: React.Dispatch<React.SetStateAction<boolean>>;
  changePhoneNumber: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  phoneCountry: string;
  setPhoneCountry: React.Dispatch<React.SetStateAction<string>>;
  phoneCode: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  handleChange,
  formData,
  displayPhoneCountry,
  setDisplayPhoneCountry,
  changePhoneNumber,
  phoneCountry,
  phoneCode
}) => {
  const listCountryFlag = [
    {
      img: 'indo',
      code: '+62',
      name: 'Indonesia'
    },
    {
      img: 'AE',
      code: '+971',
      name: 'Uni Emirate Arab'
    },
    {
      img: 'ES',
      code: '+34',
      name: 'Spain'
    },
    {
      img: 'CN',
      code: '+86',
      name: 'China'
    },
    {
      img: 'IN',
      code: '+91',
      name: 'India'
    },
    {
      img: 'us',
      code: '+1',
      name: 'United States'
    },
    {
      img: 'BR',
      code: '+55',
      name: 'Brazil'
    },
    {
      img: 'RU',
      code: '+7',
      name: 'Russia'
    },
    {
      img: 'JP',
      code: '+81',
      name: 'Japan'
    },
    {
      img: 'MX',
      code: '+52',
      name: 'Mexico'
    },
    {
      img: 'DE',
      code: '+49',
      name: 'Germany'
    },
    {
      img: 'TR',
      code: '+90',
      name: 'Turkey'
    },
    {
      img: 'FR',
      code: '+33',
      name: 'France'
    },
    {
      img: 'GB',
      code: '+44',
      name: 'United Kingdom'
    },
    {
      img: 'IT',
      code: '+39',
      name: 'Italy'
    },
    {
      img: 'ZA',
      code: '+27',
      name: 'South Africa'
    },
    {
      img: 'KR',
      code: '+82',
      name: 'South Korea'
    },
    {
      img: 'AR',
      code: '+54',
      name: 'Argentina'
    },
    {
      img: 'CA',
      code: '+1',
      name: 'Canada'
    },
    {
      img: 'SA',
      code: '+966',
      name: 'Saudi Arabia'
    },
    {
      img: 'AU',
      code: '+61',
      name: 'Australia'
    },
    {
      img: 'MY',
      code: '+60',
      name: 'Malaysia'
    },
    {
      img: 'PH',
      code: '+63',
      name: 'Philippines'
    },
    {
      img: 'TH',
      code: '+66',
      name: 'Thailand'
    },
    {
      img: 'VN',
      code: '+84',
      name: 'Vietnam'
    },
    {
      img: 'SG',
      code: '+65',
      name: 'Singapore'
    }
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="relative ">
          <div className="flex items-center">
            {/* Country and arrow image */}
            <div
              onClick={() => {
                setDisplayPhoneCountry(phone => !phone);
              }}
              className="flex pt-2 gap-4 items-center"
            >
              <Image src={phoneCountry} alt="" width={20} height={20} />
              <svg
                width="19"
                height="11"
                viewBox="0 0 19 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-1"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.56093 8.23855L7.56076 8.2387L9.81026 10.2973L12.0603 8.2387L12.0599 8.23835L18.8105 2.06002L16.5605 -9.83538e-08L9.81055 6.17916L3.06062 -6.88451e-07L0.810547 2.06002L7.56093 8.23855Z"
                  fill="black"
                />
              </svg>
            </div>
            {/* Input field */}

            <span className="border-l-2 pl-2 mt-3 w-full text-xl flex-1">
              {phoneCode}
            </span>
            <Input
              className="ml-2 w-full text-xl mb-2"
              type="tel"
              size="lg"
              color="gray"
              variant="standard"
              name="phoneNumber"
              onChange={e => {
                handleChange(e);
              }}
              value={formData.phoneNumber}
            />
          </div>
        </div>
        {/* list of country */}
        {displayPhoneCountry && (
          <div className="relative z-20">
            <div className="w-full absolute top-0 h-44 overflow-auto">
              {listCountryFlag.map((country, idx) => (
                <div
                  onClick={changePhoneNumber}
                  className="px-4 py-2 flex gap-4 items-center  bg-white top-0 w-full  hover:bg-slate-50"
                  data-value={country.code}
                  data-img={`/assets/images/${country.img}.png`}
                  key={idx}
                >
                  <Image
                    className=""
                    src={`/assets/images/${country.img}.png`}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <p>
                    {country.name} &#40;{country.code}&#41;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PhoneInput;
