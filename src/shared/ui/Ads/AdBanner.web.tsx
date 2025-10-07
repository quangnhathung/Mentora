import React, { useEffect, useRef } from 'react';

//import { useUserStore } from '@/entities/user/useUserStore';

export type AdBannerProps = {
  /** Ví dụ: "ca-pub-1234567890123456" */
  adClient?: string;
  /** Ví dụ: "9876543210" */
  adSlot?: string;
  /** 'auto' là mặc định, bạn có thể đặt kích thước cụ thể nếu cần */
  adFormat?: string; // e.g. 'auto'
  /** Bật test để không ảnh hưởng đến policy khi dev */
  adTest?: boolean;
  /** Tùy chọn style/class cho layout */
  style?: React.CSSProperties;
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const AdBanner: React.FC<AdBannerProps> = ({
  adClient = 'ca-app-pub-3940256099942544/6300978111',
  adSlot,
  adFormat = 'auto',
  adTest = true,
  style,
  className,
}) => {
  const insRef = useRef<HTMLModElement | null>(null);
  //const profile = useUserStore().profile;
  //const isPremium = profile?.premium?.isActive && (profile?.premium?.expiresAt ?? 0) > Date.now();
  useEffect(() => {
    // 1) Inject script nếu chưa có
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-adsbygoogle-script="true"]'
    );

    if (!existing) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
        adClient
      )}`;
      s.setAttribute('data-adsbygoogle-script', 'true');
      // Theo hướng dẫn AdSense cần anonymous
      s.crossOrigin = 'anonymous';
      document.head.appendChild(s);
    }

    // 2) Yêu cầu render quảng cáo
    // Lưu ý: Ads có thể không hiện khi domain chưa được approve hoặc bị adblock chặn.
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Tránh crash app nếu bị block

      console.warn('AdSense push error:', e);
    }
  }, [adClient, adSlot, adFormat, adTest]);

  //if (isPremium) return null;

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle${className ? ` ${className}` : ''}`}
      style={{
        display: 'block',
        // Gợi ý canh giữa khung quảng cáo
        margin: '0 auto',
        ...style,
      }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
      {...(adTest ? { 'data-adtest': 'on' } : {})}
    />
  );
};

export default AdBanner;
