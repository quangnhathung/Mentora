import React from 'react';

import { type Onboarding } from '@/features/onboarding/types';
import OnboardingFlow from '@/features/onboarding/ui/OnboardingFlow';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';

const stepsData: Onboarding[] = [
  {
    id: 1,
    screenName: 'Choose your native language',
    title: '',
    description: 'Choose your native language',
    choices: [
      {
        id: 1,
        value: 'vi',
        description:
          '<p class="justify-start"><p class="justify-start"><span class="text-sm">Vietnamese</span></p>',
        iconUrl: 'https://static.saoladigital.com/public/mtt-mobile-app/images/svgs/vn.svg',
      },
      {
        id: 2,
        value: 'jp',
        description:
          '<p class="justify-start"><p class="justify-start"><span class="text-sm">English</span></p>',
        iconUrl: 'https://static.saoladigital.com/public/mtt-mobile-app/images/svgs/vn.svg',
      },
      {
        id: 3,
        value: 'ge',
        description:
          '<p class="justify-start"><p class="justify-start"><span class="text-sm">ប្រទេសថៃ</span></p>',
        iconUrl: 'https://static.saoladigital.com/public/mtt-mobile-app/images/svgs/vn.svg',
      },
    ],
  },
  {
    id: 2,
    screenName: 'Introduce Yourself',

    title: 'Bạn là:',
    description: 'Chọn nghề nghiệp hiện tại của bạn',
    choices: [
      {
        id: 1,
        description:
          '<p class="justify-start"><p class="justify-start"><span class="text-sm">Sinh viên, học sinh</span></p>',
      },
      {
        id: 2,
        description:
          '<p class="justify-start"><p class="justify-start"><span class="text-sm">Lập trình viên</span></p>',
      },
      {
        id: 3,
        description:
          '<p class="justify-start"><p class="justify-start"><span class="text-sm">Nhân viên văn phòng</span></p>',
      },
      {
        id: 5,
        description:
          '<p class="justify-start"><p class="justify-start"><span class="text-sm">Người lao động</span></p>',
      },
      {
        id: 6,
        description:
          '<p class="justify-start"><p class="justify-start"><span class="text-sm">Khác</span></p>',
      },
    ],
  },
  {
    id: 3,
    screenName: 'Mục tiêu học tập',
    title: 'Mục tiêu học tập của ban:',
    description: 'Chọn mục tiêu học tập',
    choices: [
      {
        id: 1,
        description:
          '<p class="justify-start"><p class="justify-start"><span class="text-sm">Tiếng Anh thông dụng hằng ngày</span></p>',
      },
      {
        id: 2,
        description:
          '<p class="justify-start"><p class="justify-start"><span class="text-sm">Chuẩn bị cho kì thi</span></p>',
      },
      {
        id: 3,
        description:
          '<p class="justify-start"><p class="justify-start"><span class="text-sm">Phát triển bản thân</span></p>',
      },
      {
        id: 4,
        description:
          '<p class="justify-start"><p class="justify-start"><span class="text-sm">Chuẩn bị cho việc du học</span></p>',
      },
      {
        id: 5,
        description:
          '<p class="justify-start"><p class="justify-start"><span class="text-sm">Khác</span></p>',
      },
    ],
  },
  {
    id: 4,
    screenName: 'Introduce Yourself',
    title: 'Trình độ hiện tại của tôi:',
    description: 'Chọn trình độ hiện tại của bạn',
    choices: [
      {
        id: 1,
        description:
          '<p class="justify-start"><span class="text-primary text-sm">Beginner</span></p><p class="justify-start"><span class="text-sm">Mới tiếp cận Tiếng Anh</span></p>',
      },
      {
        id: 2,
        description:
          '<p class="justify-start"><span class="text-primary text-sm">Elementary</span></p><p class="justify-start"><span class=" text-sm">Hiểu biết từ vựng, ngữ pháp cơ bản</span></p>',
      },
      {
        id: 3,
        description:
          '<p class="justify-start"><span class="text-secondary text-sm">Intermediate</span></p><p class="justify-start"><span class="text-sm">Có thể nghe nói cơ bản</span></p>',
      },
      {
        id: 4,
        description:
          '<p class="justify-start"><span class="text-secondary text-sm">Advanced</span></p><p class="justify-start"><span class="text-sm">Thành thạo 4 kĩ năng</span></p>',
      },
    ],
  },
];

const OnboardingScreen = () => {
  const data = stepsData;
  return <OnboardingFlow stepsData={data} isLoading={false} isError={false} />;
};

export default withErrorBoundary(withDeviceLayout(OnboardingScreen));
