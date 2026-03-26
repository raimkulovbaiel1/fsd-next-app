'use client';

import { Settings } from '@/widgets/Settings';
import { ProfileTabs } from '@/shared/components/ProfileTabs';

const SettingsPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">

      <h1 className="text-3xl font-bold mb-6">
        Настройки профиля
      </h1>

      <ProfileTabs />

      <Settings />
    </div>
  );
};

export default SettingsPage;
