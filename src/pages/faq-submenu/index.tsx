import SubmenuButton from '@/components/ui/button/SubmenuButton';
import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import Image from 'next/image';
import router from 'next/router';
import { LegalSubmenu } from 'public/assets/images';
import {
  ArrowRightCollapseIcon,
  CircleMembership,
  Disclosure,
  FileTextIcon,
  PrivacyPolicy,
  SosmedGuide
} from 'public/assets/vector';
import React from 'react';

const FaqSubmenu: React.FC = () => {
  const width = useWindowInnerWidth();

  const submenuClasses = `lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-12 ${
    width !== undefined && width < 370 ? 'h-9' : ''
  } px-6`;

  const menus = [
    {
      onClick: () => {}
    },
    {
      label: 'Term & Condition',
      altStartAdornment: 'term & condition',
      startAdornment: FileTextIcon,
      onClick: async (): Promise<void> => {
        try {
          await router.push('/faq-submenu/terms-condition');
        } catch (err) {
          console.error(err);
        }
      },
      extraClasses: submenuClasses
    },
    {
      label: 'Disclosure',
      altStartAdornment: 'disclosure',
      startAdornment: Disclosure,
      onClick: async (): Promise<void> => {
        try {
          await router.push('/faq-submenu/disclosure');
        } catch (error) {
          console.error('Error navigating to FAQ:', error);
        }
      },
      extraClasses: submenuClasses
    },
    {
      label: 'Privacy & Policy',
      altStartAdornment: 'privacy & policy',
      startAdornment: PrivacyPolicy,
      onClick: async (): Promise<void> => {
        try {
          await router.push('/faq-submenu/privacy-policy');
        } catch (error) {
          console.error('Error navigating to FAQ:', error);
        }
      },
      extraClasses: submenuClasses
    },
    {
      label: 'Social Media Guidelines',
      altStartAdornment: 'social media guidelines',
      startAdornment: SosmedGuide,
      onClick: async (): Promise<void> => {
        try {
          await router.push('/faq-submenu/social-media-guide');
        } catch (error) {
          console.error('Error navigating to FAQ:', error);
        }
      },
      extraClasses: submenuClasses
    },
    {
      label: 'Circle Membership',
      altStartAdornment: 'circle membership',
      startAdornment: CircleMembership,
      onClick: async (): Promise<void> => {
        try {
          await router.push('/faq-submenu/circle-membership');
        } catch (error) {
          console.error('Error navigating to FAQ:', error);
        }
      },
      extraClasses: submenuClasses
    }
  ];

  return (
    <PageGradient
      defaultGradient
      className="sm:relative sm:pb-20 absolute overflow-hidden flex flex-col items-center w-full bottom-0"
    >
      <CardGradient
        defaultGradient
        className={`relative overflow-hidden flex flex-col items-center py-4 w-full sm:w-[90%] sm:rounded-[18px] sm:min-h-[36rem] ${
          width !== undefined && width < 370
            ? 'h-[38rem]'
            : width !== undefined && width < 400
            ? 'h-[45rem]'
            : width !== undefined && width < 415
            ? 'h-[48rem]'
            : ''
        } bg-white`}
      >
        {/* -----Title----- */}
        <h6 className="mb-4 text-center text-lg font-poppins font-semibold">
          Legal
        </h6>

        {/* -----Header----- */}
        <div className="z-10 lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-52 sm:px-0 px-6 mb-4">
          <div
            className={`flex flex-col justify-center items-center ${
              width !== undefined && width < 370 ? 'py-4' : ''
            } w-full h-full bg-white`}
          >
            {/* -----Image Container----- */}
            <div
              className={`overflow-hidden mb-3 rounded-full ${
                width !== undefined && width <= 370
                  ? 'h-100 w-100'
                  : 'h-205 w-205'
              }`}
            >
              <Image
                alt="avatar"
                src={LegalSubmenu}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
        </div>

        {/* -----Submenus----- */}
        <div className="z-10 flex flex-col items-center w-full sm:px-0 px-6">
          {menus.map(menu => (
            <SubmenuButton
              key={menu.label}
              onClick={menu.onClick}
              startAdornment={menu.startAdornment}
              endAdornment={ArrowRightCollapseIcon}
              label={menu.label}
              altStartAdornment={menu.altStartAdornment}
              extraClasses={menu.extraClasses}
            />
          ))}
        </div>
      </CardGradient>
    </PageGradient>
  );
};

export default FaqSubmenu;
