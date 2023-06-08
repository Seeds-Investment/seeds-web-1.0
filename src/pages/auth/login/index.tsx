import AuthLayout from '@/components/layouts/AuthLayout';
import React from 'react';

export default function Login(): React.ReactElement {
  return <div className="min-h-full bg-green-100">login</div>;
}

Login.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
