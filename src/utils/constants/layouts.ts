import AuthLayout from '@/components/layouts/AuthLayout';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import SampleLayout from '@/components/layouts/SampleLayout';

export const Layouts = {
  DEFAULT: DefaultLayout,
  AUTH: AuthLayout,
  SAMPLE: SampleLayout
};

export type LayoutKeys = keyof typeof Layouts;
