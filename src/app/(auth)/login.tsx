import React from 'react';

import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import LoginOauth from '@/widgets/auth/LoginOauth';

const LoginScreen = () => {
  // const router = useRouter();

  // const onSubmit: LoginFormProps['onSubmit'] = (data) => {
  //   console.log(data);
  //   signIn({ access: 'access-token', refresh: 'refresh-token' });
  //   router.push('/');
  // };
  return <LoginOauth />;
};

export default withErrorBoundary(withDeviceLayout(LoginScreen));
