import CCard from '@/components/CCard';
import ChooseCurrencyPopup from '@/components/popup/ChooseCurrency';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Section1 from '@/containers/homepage/Section1';
import Section2 from '@/containers/homepage/Section2';
import Section3 from '@/containers/homepage/Section3';
import Section4 from '@/containers/homepage/Section4';
import Section5 from '@/containers/homepage/Section5';
import TrendingSection from '@/containers/homepage/TrendingSection';
import SocketService from '@/helpers/SocketService';
import withAuth from '@/helpers/withAuth';
import { getUserInfo } from '@/repository/profile.repository';
import { useEffect, useState } from 'react';

const Homepage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>([]);
  const [popUpCurrency, setPopupCurrency] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const dataInfo = await getUserInfo();
        setUserInfo(dataInfo);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);
  useEffect(() => {
    if (userInfo !== undefined) {
      SocketService.disconnect(userInfo?.id);
      return () => {
        SocketService.disconnect(userInfo?.id);
      };
    }

    if (userInfo?.id !== undefined) {
      SocketService.connect(userInfo?.id);
    }

    return () => {
      SocketService.disconnect(userInfo?.id);
    };
  }, [userInfo, userInfo?.id]);

  useEffect(() => {
    if (userInfo?.preferredCurrency?.length === 0) {
      setPopupCurrency(true);
    }
  }, [userInfo]);

  const handleOpen = (): void => {
    setPopupCurrency(!popUpCurrency);
  };

  return (
    <PageGradient defaultGradient className="w-full">
      <ChooseCurrencyPopup handleOpen={handleOpen} open={popUpCurrency} />
      <CCard className="p-3 mb-5">
        <Section1 />
      </CCard>
      <CCard className="p-3 mb-5">
        <Section2 userInfo={userInfo} />
      </CCard>
      <CCard className="px-3 py-5 mb-5">
        <Section3 />
      </CCard>
      <CCard className="p-3 mb-5">
        <Section4 />
      </CCard>
      <CCard className="p-3 mb-5">
        <TrendingSection userInfo={userInfo} />
      </CCard>
      <CCard className="p-3 mb-5">
        <Section5 />
      </CCard>
    </PageGradient>
  );
};

export default withAuth(Homepage);
