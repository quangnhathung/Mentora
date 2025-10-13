import { vars } from 'nativewind';
import React, { useMemo, useState } from 'react';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';

import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { View } from '@/shared/ui';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { type ChoiceBase } from '@/shared/ui/List/SelectableList';
import { HeaderWithBack } from '@/widgets/common/HeaderWithBack';
import { Contact } from '@/widgets/profile/help/contact';
import { HelpList } from '@/widgets/profile/help/HelpList';
import { type Filter, LevelFilter } from '@/widgets/topic/LevelFilter';

const labels: Filter[] = [
  { key: '1', label: String(translate('profile.help.stats.general') || '') },
  { key: '2', label: String(translate('profile.help.stats.account') || '') },
  { key: '3', label: String(translate('profile.help.stats.service') || '') },
  { key: '4', label: 'Other' },
];

export type HelpCenter = {
  id: number;
  title: string;
  content: string;
  filter: string; // đổi thành string
};

const helpContent: HelpCenter[] = [
  {
    id: 1,
    title: String(translate('profile.help.fqa.Mahtutor') || ''),
    content:
      '“Khởi động” là giai đoạn làm quen, giúp bạn nắm vững kiến thức cơ bản và tạo nền tảng cho hành trình học tiếng Anh.',
    filter: '3',
  },
  {
    id: 2,
    title: String(translate('profile.help.fqa.start') || ''),
    content:
      'Bạn có thể bắt đầu bài học đầu tiên bằng cách đăng nhập vào ứng dụng, chọn mục "Lesson" và làm theo hướng dẫn.',
    filter: '3',
  },
  {
    id: 3,
    title: String(translate('profile.help.fqa.earn') || ''),
    content:
      'Bạn sẽ nhận được "stars" khi hoàn thành các bài học, làm đúng bài tập và tham gia thử thách trong ứng dụng.',
    filter: '3',
  },
  {
    id: 4,
    title: String(translate('profile.help.fqa.account') || ''),
    content:
      'Để đóng tài khoản Mahtutor, hãy vào phần "Cài đặt" → "Tài khoản" và chọn tùy chọn "Xóa tài khoản".',
    filter: '2',
  },
  {
    id: 5,
    title: 'Làm sao để đổi mật khẩu?',
    content: 'Bạn có thể đổi mật khẩu trong phần "Cài đặt" → "Bảo mật" → "Đổi mật khẩu".',
    filter: '2',
  },
  {
    id: 6,
    title: 'Học trên nhiều thiết bị có được không?',
    content: 'Bạn có thể đăng nhập trên nhiều thiết bị, tiến trình học sẽ được đồng bộ.',
    filter: '1',
  },
  {
    id: 7,
    title: 'Ứng dụng có chế độ ngoại tuyến không?',
    content: 'Một số bài học có thể tải về để học khi không có kết nối mạng.',
    filter: '3',
  },
  {
    id: 8,
    title: 'Tôi bị mất tiến trình học, phải làm sao?',
    content:
      'Hãy kiểm tra xem bạn đã đăng nhập đúng tài khoản chưa. Nếu vẫn lỗi, liên hệ bộ phận hỗ trợ.',
    filter: '1',
  },
  {
    id: 9,
    title: 'Làm sao để gia hạn gói học?',
    content: 'Vào phần "Tài khoản" → "Gói học" để gia hạn hoặc nâng cấp dịch vụ.',
    filter: '4',
  },
  {
    id: 10,
    title: 'Có thể yêu cầu hoàn tiền không?',
    content:
      'Trong vòng 7 ngày kể từ khi mua gói học, bạn có thể gửi yêu cầu hoàn tiền qua mục "Hỗ trợ khách hàng".',
    filter: '4',
  },
  {
    id: 11,
    title: 'Ứng dụng có chứng chỉ sau khóa học không?',
    content:
      'Sau khi hoàn thành toàn bộ khóa học, bạn sẽ nhận được chứng chỉ điện tử do hệ thống cấp.',
    filter: '3',
  },
];

const ContactMenuMock: ChoiceBase[] = [
  {
    id: 1,
    value: 'customer',
    description: `<p class="justify-start"><span class="text-white text-sm">${translate('profile.help.contact.direct')}</span></p>`,
    icon: 'customer',
  },
  {
    id: 2,
    value: 'web',
    description: `<p class="justify-start"><span class="text-white text-sm">${'Website'}</span></p>`,
    icon: 'website',
  },
  {
    id: 3,
    value: 'tiktok',
    description: `<p class="justify-start"><span class="text-white text-sm">${'Tiktok'}</span></p>`,
    icon: 'tiktok',
  },
  {
    id: 4,
    value: 'facebook',
    description: `<p class="justify-start"><span class="text-white text-sm">${'Facebook'}</span></p>`,
    icon: 'facebook',
  },
];

const ProfileScreen = () => {
  const [filter, setFilter] = useState<string>('1'); // đổi thành string
  const HelpData = useMemo(
    () => (filter === '1' ? helpContent : helpContent.filter((item) => item.filter === filter)),
    [filter]
  );
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  return (
    <ThreeSection
      edges={['top']}
      className={``}
      scrollable
      style={moderateSize}
      Header={<HeaderWithBack title={String(translate('profile.help.title') || '')} />}
      Body={
        <TabsProvider defaultIndex={0}>
          <Tabs
            mode="fixed"
            disableSwipe={false}
            tabLabelStyle={{ fontSize: 16, color: '#fff' }}
            style={{ backgroundColor: 'transparent' }}
            theme={{ colors: { primary: '#FFAA00' } }}
          >
            <TabScreen label="FAQ">
              <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <View className="w-full py-3">
                  <LevelFilter data={labels} value={filter} onChange={setFilter} />
                  <HelpList className="mt-2" data={HelpData} />
                </View>
              </View>
            </TabScreen>
            <TabScreen label={String(translate('profile.help.contact.title') || '')}>
              <View className="flex-1">
                <Contact className="pt-6" data={ContactMenuMock} />
              </View>
            </TabScreen>
          </Tabs>
        </TabsProvider>
      }
      Bottom={<></>}
    />
  );
};

export default withErrorBoundary(withDeviceLayout(ProfileScreen));
