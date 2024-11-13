import CAccordion from '@/components/CAccordion';
import Dropdown from '@/components/Dropdown';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import common from '@/utils/common';
import { type ILanguage } from '@/utils/interfaces/components.interfaces';
import Image from 'next/image';
import bgLine from 'public/assets/story-boarding/bg-line.png';
import hello from 'public/assets/story-boarding/hello.png';
import logo from 'public/assets/story-boarding/logo-seeds.png';
import { Disclosure, FileTextIcon, SosmedGuide } from 'public/assets/vector';
import { useTranslation } from 'react-i18next';
import CircleMembership from './CircleMembership';
import DisclosureComp from './DisclosureComp';
import PrivacyPolicy from './PrivacyPolicy';
import SocialMediaGuide from './SocialMediaGuide';
import TermsConditions from './TermsConditions';

export default function Login(): React.ReactElement {
  const { i18n, t } = useTranslation();
  const menus = [
    {
      label: t('termAndCondition.title'),
      altStartAdornment: 'terms-condition',
      startAdornment: FileTextIcon
    },
    {
      label: t('faq.disclosure.title'),
      altStartAdornment: 'disclosure',
      startAdornment: Disclosure
    },
    {
      label: t('faq.privacy.title'),
      altStartAdornment: 'privacy-policy',
      startAdornment: PrivacyPolicy
    },
    {
      label: t('termAndCondition.socialMediaGuide.title'),
      altStartAdornment: 'social-media-guide',
      startAdornment: SosmedGuide
    },
    {
      label: t('termAndCondition.circleMembership.title'),
      altStartAdornment: 'circle-membership',
      startAdornment: CircleMembership
    }
  ];

  const changeLanguage = (lng: string): void => {
    void i18n.changeLanguage(lng);
  };

  return (
    <div className="bg-gradient-to-bl md:bg-none from-[#6f6dd3] to-[#50e1b0] min-h-screen">
      <PageGradient className="w-full" defaultGradient>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gradient-to-bl from-[#6f6dd3] to-[#50e1b0] p-5 hidden md:block min-h-screen">
            <div className="flex justify-center items-center h-fit relative">
              <Image src={hello} alt="hello-image" width={430} height={430} />
              <Image
                src={bgLine}
                alt="line-bg"
                width={300}
                height={300}
                className="absolute w-full bottom-0"
              />
            </div>
          </div>
          <div className="p-5 md:p-10 min-h-screen">
            <div className="bg-white/50 rounded-2xl shadow p-3 h-full">
              <div className="w-full flex justify-between items-center lg:pr-0">
                <Image src={logo} alt="" />
                <Dropdown
                  options={common.langOptions}
                  onClick={(v: ILanguage) => {
                    changeLanguage(v.id);
                  }}
                />
              </div>
              <p className="font-bold text-2xl mt-8">Legal</p>
              <div className="mt-4">
                {menus.map(item => (
                  <CAccordion
                    key={item.altStartAdornment}
                    title={item.label}
                    description={
                      item.altStartAdornment === 'terms-condition' ? (
                        <TermsConditions />
                      ) : item.altStartAdornment === 'privacy-policy' ? (
                        <PrivacyPolicy />
                      ) : item.altStartAdornment === 'disclosure' ? (
                        <DisclosureComp />
                      ) : item.altStartAdornment === 'social-media-guide' ? (
                        <SocialMediaGuide />
                      ) : (
                        <CircleMembership />
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageGradient>
    </div>
  );
}
