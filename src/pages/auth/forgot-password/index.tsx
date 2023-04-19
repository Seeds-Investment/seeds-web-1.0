import AuthLayout from '@/components/layouts/AuthLayout';
import React from 'react';

export default function ForgotPassword(): React.ReactElement {
  return <div>forgot</div>;
}

ForgotPassword.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
