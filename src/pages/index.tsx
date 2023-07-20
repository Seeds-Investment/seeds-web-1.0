import Header from '@/components/layouts/Header';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Section1 from '@/containers/landing/Section1';
import Section2 from '@/containers/landing/Section2';
import Section3 from '@/containers/landing/Section3';
import Section4 from '@/containers/landing/Section4';
import Section5 from '@/containers/landing/Section5';
import Section6 from '@/containers/landing/Section6';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function Home(): React.ReactElement {
  // const { t } = useTranslation();
  const router = useRouter();
  const customGradient = (
    <>
      <span className="z-0 fixed bottom-10 -left-10 w-60 h-48 bg-seeds-green-2 blur-[90px] rotate-45" />
      <span className="z-0 fixed bottom-0 left-0 w-24 h-24 bg-seeds-green-2 blur-[90px]" />
      <span className="z-0 fixed -bottom-28 left-16 w-48 h-32 bg-seeds-purple-2 blur-[90px] rotate-45" />
      <span className="z-0 fixed top-64 -right-4 w-60 h-48 bg-seeds-green-2 blur-[90px] rotate-45 rounded-full" />
      <span className="z-0 fixed bottom-36 right-0 w-32 h-32 bg-seeds-purple-2 blur-[90px] rotate-90 rounded-full" />
    </>
  );

  useEffect(() => {
    if (localStorage.getItem('isRegistering') === 'true') {
      router
        .push('/auth/register')
        .then()
        .catch(() => {});
    }
  }, [router]);

  // return (
  //   <AuthLayout>
  //     <>
  //       <LanguageSwitcher />
  //       {t('greeting', { name: 'Seeds!' })}
  //     </>
  //   </AuthLayout>
  // );

  return (
    <>
      <Header />
      <PageGradient
        customGradient={customGradient}
        className="absolute overflow-hidden w-full"
      >
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
      </PageGradient>
    </>
  );
}
