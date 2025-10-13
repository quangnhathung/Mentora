const { withAndroidManifest, AndroidConfig, withInfoPlist } = require('@expo/config-plugins');

const META_NAME = 'com.google.android.gms.ads.APPLICATION_ID';

function withAdmobAndroid(config, { androidAppId }) {
  return withAndroidManifest(config, (c) => {
    const manifest = c.modResults;

    // Thêm namespace tools nếu chưa có
    manifest.manifest.$ = manifest.manifest.$ || {};
    if (!manifest.manifest.$['xmlns:tools']) {
      manifest.manifest.$['xmlns:tools'] = 'http://schemas.android.com/tools';
    }

    const app = AndroidConfig.Manifest.getMainApplicationOrThrow(manifest);

    // Xóa meta-data cũ cùng name nếu có
    app['meta-data'] = app['meta-data'] || [];
    app['meta-data'] = app['meta-data'].filter((item) => item.$['android:name'] !== META_NAME);

    // Thêm meta-data mới
    app['meta-data'].push({
      $: {
        'android:name': META_NAME,
        'android:value': androidAppId,
        'tools:replace': 'android:value',
      },
    });

    c.modResults = manifest;
    return c;
  });
}

function withAdmobIOS(config, { iOsAppId }) {
  return withInfoPlist(config, (c) => {
    c.modResults.GADApplicationIdentifier = iOsAppId;
    return c;
  });
}

module.exports = function withAdmob(config, props) {
  config = withAdmobAndroid(config, props);
  config = withAdmobIOS(config, props);
  return config;
};
