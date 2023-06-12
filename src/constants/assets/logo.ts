import type { AssetsInterface } from '.';

export const SeedsLogo: AssetsInterface = {
  src: '/assets/images/SeedsTypo.png',
  alt: 'seeds-logo-typograph'
};

export const FacebookBrand: AssetsInterface = {
  src: '/assets/images/facebook.svg',
  alt: 'facebook-logo'
};

export const GoogleBrand: AssetsInterface = {
  src: '/assets/images/google.svg',
  alt: 'google-logo'
};

export const AppleBrand: AssetsInterface = {
  src: '/assets/images/apple.svg',
  alt: 'apple-logo'
};

const Logo: Record<string, AssetsInterface> = {
  SeedsLogo,
  FacebookBrand,
  GoogleBrand,
  AppleBrand
};

export default Logo;
