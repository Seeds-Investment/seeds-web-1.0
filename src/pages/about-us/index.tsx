'use client';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Section1 from '@/containers/about-us/Section1';
import React from 'react';

export default function AboutUsPage(): React.ReactElement {
  return (
    <PageGradient defaultGradient className="absolute overflow-hidden w-full">
      <Section1 />
    </PageGradient>
  );
}
