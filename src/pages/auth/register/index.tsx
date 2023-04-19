import AuthLayout from '@/components/layouts/AuthLayout';
import React from 'react';

export default function Register(): React.ReactElement {
  return <div className="absolute">register</div>;
}

Register.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
