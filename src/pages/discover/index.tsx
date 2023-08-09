'use client';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import DiscoverNews from '@/containers/discover/DiscoverNews';
import DiscoverSearch from '@/containers/discover/DiscoverSearch';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';

export default function Discover(): React.ReactElement {
  const width = useWindowInnerWidth();

  return (
    <PageGradient
      defaultGradient
      className={`z-0 sm:relative sm:py-10  overflow-hidden flex flex-col items-center w-full bottom-0  ${
        width !== undefined && width < 370
          ? 'w-[90%]'
          : width !== undefined && width < 500
          ? 'w-[90%]'
          : width !== undefined && width < 400
          ? 'w-[40%]'
          : width !== undefined && width > 600
          ? 'w-[600px]'
          : ''
      } ${
        width !== undefined && width < 370
          ? 'h-[50rem]'
          : width !== undefined && width < 400
          ? 'h-[50rem]'
          : width !== undefined && width < 415
          ? 'h-[48rem]'
          : ''
      } bg-white`}
    >
      <DiscoverSearch />
      <DiscoverNews />
    </PageGradient>
  );
}
