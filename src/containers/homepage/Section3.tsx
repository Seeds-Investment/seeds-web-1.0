import { getUserInfo } from '@/repository/profile.repository';
import { useEffect, useState } from 'react';

interface UserData {
  name: string;
  seedsTag: string;
  email: string;
  pin: string;
  avatar: string;
  bio: string;
  birthDate: string;
  phone: string;
  _pin: string;
  refCode: string;
}

const Section3 = (): React.ReactElement => {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await getUserInfo();
        setUserInfo(response);
      } catch (error) {
        console.log(error);
      }
    };

    void fetchData();
  }, []);

  function copyValueWithUrl(valueToCopy: string): boolean {
    const textToCopy = `${valueToCopy}`;

    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      const copied = document.execCommand('copy');
      if (copied) {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 3000);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Error copying text: ', err);
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }

  return (
    <div className="w-full h-auto cursor-default">
      {open && (
        <div
          id="myToast"
          className="fixed right-10 z-50 bottom-10 px-5 py-4 border-r-8 border-blue-500 bg-white drop-shadow-lg"
        >
          <p className="text-sm">
            <span className="mr-2 inline-block px-3 py-1 rounded-full bg-blue-500 text-white font-extrabold">
              i
            </span>
            Referral Code copied to Clipboard
          </p>
        </div>
      )}
      <h1 className="text-3xl font-semibold text-[#262626]">Referral Code</h1>
      <div className="mt-4 flex">
        <div className="flex justify-between border w-full border-gray-300 px-4 py-2 rounded-md">
          <input
            type="text"
            value={userInfo?.refCode}
            placeholder="Enter your referral code"
            className="w-full bg-white"
            disabled
          />
          <div className="flex">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                copyValueWithUrl(userInfo?.refCode ?? '');
              }}
            >
              <g clipPath="url(#clip0_1957_35948)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.16602 8.34049C8.70578 8.34049 8.33268 8.71359 8.33268 9.17383V16.6738C8.33268 17.1341 8.70578 17.5072 9.16602 17.5072H16.666C17.1263 17.5072 17.4993 17.1341 17.4993 16.6738V9.17383C17.4993 8.71359 17.1263 8.34049 16.666 8.34049H9.16602ZM6.66602 9.17383C6.66602 7.79312 7.7853 6.67383 9.16602 6.67383H16.666C18.0467 6.67383 19.166 7.79312 19.166 9.17383V16.6738C19.166 18.0545 18.0467 19.1738 16.666 19.1738H9.16602C7.7853 19.1738 6.66602 18.0545 6.66602 16.6738V9.17383Z"
                  fill="#27A590"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.33398 2.50651C3.11297 2.50651 2.90101 2.59431 2.74473 2.75059C2.58845 2.90687 2.50065 3.11883 2.50065 3.33984V10.8398C2.50065 11.0609 2.58845 11.2728 2.74473 11.4291C2.90101 11.5854 3.11297 11.6732 3.33398 11.6732H4.16732C4.62755 11.6732 5.00065 12.0463 5.00065 12.5065C5.00065 12.9667 4.62755 13.3398 4.16732 13.3398H3.33398C2.67094 13.3398 2.03506 13.0765 1.56622 12.6076C1.09738 12.1388 0.833984 11.5029 0.833984 10.8398V3.33984C0.833984 2.6768 1.09738 2.04092 1.56622 1.57208C2.03506 1.10324 2.67094 0.839844 3.33398 0.839844H10.834C11.497 0.839844 12.1329 1.10324 12.6018 1.57208C13.0706 2.04092 13.334 2.6768 13.334 3.33984V4.17318C13.334 4.63341 12.9609 5.00651 12.5007 5.00651C12.0404 5.00651 11.6673 4.63341 11.6673 4.17318V3.33984C11.6673 3.11883 11.5795 2.90687 11.4232 2.75059C11.267 2.59431 11.055 2.50651 10.834 2.50651H3.33398Z"
                  fill="#27A590"
                />
              </g>
              <defs>
                <clipPath id="clip0_1957_35948">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0 0.00683594)"
                  />
                </clipPath>
              </defs>
            </svg>
            <h1 className="text-sm font-semibold text-[#27A590] ms-2">Copy</h1>
          </div>
        </div>
        <div className="bg-[#3AC4A0] p-3 justify-center text-center ms-1 rounded-lg">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              copyValueWithUrl(userInfo?.refCode ?? '');
            }}
          >
            <g clipPath="url(#clip0_1957_35951)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.9993 2.50651C14.0789 2.50651 13.3327 3.2527 13.3327 4.17318C13.3327 5.09365 14.0789 5.83984 14.9993 5.83984C15.9198 5.83984 16.666 5.09365 16.666 4.17318C16.666 3.2527 15.9198 2.50651 14.9993 2.50651ZM11.666 4.17318C11.666 2.33223 13.1584 0.839844 14.9993 0.839844C16.8403 0.839844 18.3327 2.33223 18.3327 4.17318C18.3327 6.01413 16.8403 7.50651 14.9993 7.50651C13.1584 7.50651 11.666 6.01413 11.666 4.17318Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.99935 8.34049C4.07887 8.34049 3.33268 9.08669 3.33268 10.0072C3.33268 10.9276 4.07887 11.6738 4.99935 11.6738C5.91982 11.6738 6.66602 10.9276 6.66602 10.0072C6.66602 9.08669 5.91982 8.34049 4.99935 8.34049ZM1.66602 10.0072C1.66602 8.16621 3.1584 6.67383 4.99935 6.67383C6.8403 6.67383 8.33268 8.16621 8.33268 10.0072C8.33268 11.8481 6.8403 13.3405 4.99935 13.3405C3.1584 13.3405 1.66602 11.8481 1.66602 10.0072Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.9993 14.1735C14.0789 14.1735 13.3327 14.9197 13.3327 15.8402C13.3327 16.7606 14.0789 17.5068 14.9993 17.5068C15.9198 17.5068 16.666 16.7606 16.666 15.8402C16.666 14.9197 15.9198 14.1735 14.9993 14.1735ZM11.666 15.8402C11.666 13.9992 13.1584 12.5068 14.9993 12.5068C16.8403 12.5068 18.3327 13.9992 18.3327 15.8402C18.3327 17.6811 16.8403 19.1735 14.9993 19.1735C13.1584 19.1735 11.666 17.6811 11.666 15.8402Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.43768 10.8455C6.6694 10.4479 7.1796 10.3134 7.57725 10.5451L13.2689 13.8618C13.6666 14.0935 13.8011 14.6037 13.5694 15.0013C13.3376 15.399 12.8274 15.5335 12.4298 15.3018L6.73812 11.9851C6.34047 11.7534 6.20596 11.2432 6.43768 10.8455Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.5608 5.01208C13.7927 5.40958 13.6585 5.91987 13.261 6.15184L7.57771 9.46851C7.18021 9.70048 6.66992 9.56629 6.43795 9.16879C6.20598 8.77129 6.34016 8.261 6.73766 8.02903L12.421 4.71236C12.8185 4.48039 13.3288 4.61458 13.5608 5.01208Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_1957_35951">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0 0.00683594)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Section3;
