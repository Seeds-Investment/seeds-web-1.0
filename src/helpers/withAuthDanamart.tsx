'use client';
import Modal from '@/components/ui/modal/Modal';
import { getIdleLogout } from '@/repository/danamart/auth.repository';
import { getProfileUser } from '@/repository/danamart/danamart.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { isGuest } from './guest';

const withAuthDanamart = (
  WrappedComponent: React.ComponentType
): React.ComponentType => {
  const WrapperComponent = (props: any): JSX.Element => {
    const { t } = useTranslation();
    const router = useRouter();
    const hasLoggedOutRef = useRef(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isLoadingDanamart, setIsLoadingDanamart] = useState<boolean>(true);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
      const token = localStorage.getItem('accessToken-danamart');
      setAccessToken(token);
    }, []);

    useEffect(() => {
      const checkAuthDanamart = async (): Promise<void> => {
        try {
          const response = await getProfileUser();
          if (response.status === 200 && router.pathname === '/danamart') {
            await router.push('/danamart/dashboard');
          } else if (response === 'Access token Danamart not found') {
            await router.push('/danamart');
          }
        } catch (error) {
          localStorage.removeItem('accessToken-danamart');
          await router.push('/danamart');
        } finally {
          setIsLoadingDanamart(false);
        }
      };

      const checkAuthSeeds = async (): Promise<void> => {
        try {
          const response = await getUserInfo();
          if (response === 'Access token not found' && !isGuest()) {
            const targetPath = !router.pathname.includes('/microsite-quiz')
              ? '/'
              : '/microsite-quiz';
            await router.push(targetPath);
          }
        } catch (error: any) {
          const targetPath = !router.pathname.includes('/microsite-quiz')
            ? '/'
            : '/microsite-quiz';
          await router.push(targetPath);
          if (error.response?.status === 401) {
            toast.error(t('landingPageV2.redirectError'));
          }
        } finally {
          setLoading(false);
        }
      };

      void (async () => {
        await Promise.all([checkAuthDanamart(), checkAuthSeeds()]);
      })();
    }, [router.pathname, accessToken]);
    
    // Idle Logout
    useEffect(() => {
      let idleTimer: NodeJS.Timeout;

      const stopIdleTimer = (): void => {
        clearTimeout(idleTimer);
        window.removeEventListener("mousemove", activityHandler);
        window.removeEventListener("keydown", activityHandler);
        window.removeEventListener("click", activityHandler);
      };

      const resetIdleTimer = (): void => {
        if (hasLoggedOutRef.current) {
          stopIdleTimer();
          return;
        }

        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          if (!hasLoggedOutRef.current) {
            void (async () => {
              try {
                const response = await getIdleLogout();

                if (response?.data?.StatusCode === "200") {
                  window.localStorage.removeItem('accessToken-danamart');
                  hasLoggedOutRef.current = true;
                  toast.warning(t('danamart.idleLogout'));
                  void router.push('/danamart')
                  stopIdleTimer();
                }
              } catch {}
            })();
          }
        }, 1800000);
      }

      const activityHandler = (): void => {
        resetIdleTimer();
      };

      window.addEventListener("mousemove", activityHandler);
      window.addEventListener("keydown", activityHandler);
      window.addEventListener("click", activityHandler);

      resetIdleTimer();

      return () => {
        stopIdleTimer();
      };
    }, []);

    if (isLoading || isLoadingDanamart) {
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

export default withAuthDanamart;
