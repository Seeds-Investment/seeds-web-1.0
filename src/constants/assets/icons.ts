import type { AssetsInterface } from '.';

export const Eye: AssetsInterface = {
  src: '/assets/vector/eye.svg',
  alt: 'eye-icon'
};

export const EyeSlash: AssetsInterface = {
  src: '/assets/vector/eye-slash.svg',
  alt: 'eye-slash-icon'
};

export const Loader: AssetsInterface = {
  src: '/assets/vector/loader.svg',
  alt: 'loader-icon'
};

const Icons: Record<string, AssetsInterface> = {
  Eye,
  EyeSlash,
  Loader
};

export default Icons;
