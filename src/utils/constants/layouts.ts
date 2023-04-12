import AuthLayout from '@/components/layouts/AuthLayout';
import DefaultLayout from '@/components/layouts/DefaultLayout';

export const Layouts = {
  DEFAULT: DefaultLayout,
  AUTH: AuthLayout
};

export type LayoutKeys = keyof typeof Layouts;
