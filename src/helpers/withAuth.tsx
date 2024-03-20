'use client';
import Modal from '@/components/ui/modal/Modal';
import { isGuest } from '@/helpers/guest';
import { getRefreshToken } from '@/repository/auth.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const withAuth = (
  WrappedComponent: React.ComponentType
): React.ComponentType => {
  const WrapperComponent = (props: any): JSX.Element => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async (): Promise<void> => {
        try {
          const response = await getUserInfo();
          if (response === 'Access token not found' && isGuest() === false) {
            await router
              .push('/')
              .then()
              .catch(() => {});
          }
        } catch (error: any) {
          if (error.response.status === 401) {
            const fetchNewAccessToken = await getRefreshToken();
            if (
              fetchNewAccessToken === 'Please Login again' ||
              fetchNewAccessToken === 'Refresh token not found'
            ) {
              router
                .push('/')
                .then()
                .catch(() => []);
            } else {
              localStorage.setItem(
                'accessToken',
                fetchNewAccessToken.accessToken
              );
              localStorage.setItem(
                'refreshToken',
                fetchNewAccessToken.refreshToken
              );
            }
          } else {
            router
              .push('/')
              .then()
              .catch(() => []);
          }
        } finally {
          setLoading(false);
        }
      };

      checkAuth()
        .then()
        .catch(() => {});
    }, [router]);

    if (isLoading) {
      return (
        <Modal onClose={() => {}}>
          <div className="flex flex-col justify-center items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                className="spinner_P7sC"
              />
            </svg>
            <Typography className="text-lg font-bold text-seeds-button-green mt-5">
              Please wait....
            </Typography>
          </div>
        </Modal>
      );
    } else {
      return <WrappedComponent {...props} />;
    }
  };
  return WrapperComponent;
};

export default withAuth;
