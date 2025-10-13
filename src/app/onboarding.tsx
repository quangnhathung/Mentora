import React from 'react';

import useOnboardingData from '@/features/onboarding/model/useOnboardingData';
import OnboardingFlow from '@/features/onboarding/ui/OnboardingFlow';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';

const OnboardingScreen = () => {
  const { data = [], isLoading, isError } = useOnboardingData.getOnboardingData();
  return <OnboardingFlow stepsData={data} isLoading={isLoading} isError={isError} />;
};

export default withErrorBoundary(withDeviceLayout(OnboardingScreen));
