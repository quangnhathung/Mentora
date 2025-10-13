import { useUserStore } from '@/entities/user/useUserStore';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';

// ---- Zustand Subscription block ----

let wired = false;
export const subscriptionStores = () => {
  if (wired) return;
  wired = true;

  // Khi profile đổi => update lastLogin.email
  useUserStore.subscribe(
    (s) => s.profile, // khai báo state change -> selector
    (newProfile) => {
      //  -> listener
      if (newProfile?.email) {
        useAuthStore.getState().setLastLogin({
          email: newProfile.email,
          provider: useAuthStore.getState().lastLogin.provider, // giữ nguyên provider nếu có
        });
      }
    }
  );

  // Khi auth signOut => reset user profile
  useAuthStore.subscribe(
    (s) => s.status,
    (newStatus, prevStatus) => {
      if (newStatus === 'signOut' && prevStatus !== 'signOut') {
        useUserStore.getState().resetUserProfile();
      }
    }
  );
};
