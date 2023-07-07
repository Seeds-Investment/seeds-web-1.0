import Modal from '@/components/ui/modal/Modal';
import { getRefreshToken } from '@/repository/auth.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { Spinner, Typography } from '@material-tailwind/react';
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
          if (response === 'Access token not found') {
            await router
              .push('/auth/login')
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
                .push('/auth/login')
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
              .push('/auth/login')
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
            <Spinner width={40} radius={20} height={40} color="green" />
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
