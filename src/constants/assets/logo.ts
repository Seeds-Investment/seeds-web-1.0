import type { AssetsInterface } from '.';

export const SeedsLogo: AssetsInterface = {
  src: '/assets/images/seeds-logo.png',
  alt: 'seeds-logo-typograph'
};

export const FacebookBrand: AssetsInterface = {
  src: '/assets/images/facebook-logo.png',
  alt: 'facebook-logo'
};

export const GoogleBrand: AssetsInterface = {
  src: '/assets/images/google-logo.png',
  alt: 'google-logo'
};

export const AppleBrand: AssetsInterface = {
  src: '/assets/images/apple-logo.png',
  alt: 'apple-logo'
};

const Logo: Record<string, AssetsInterface> = {
  SeedsLogo,
  FacebookBrand,
  GoogleBrand,
  AppleBrand
};

export default Logo;
