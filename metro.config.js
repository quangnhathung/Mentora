/* eslint-env node */

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// 1) use svg transformer
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

// 2) ensure svg is removed from assetExts and added to sourceExts
const resolver = config.resolver || {};
const assetExts = (resolver.assetExts || []).filter((ext) => ext !== 'svg');
const sourceExts = Array.from(new Set([...(resolver.sourceExts || []), 'svg']));

config.resolver = {
  ...resolver,
  assetExts,
  sourceExts,
};

// 3) keep nativewind wrapper and pass the modified config
module.exports = withNativeWind(config, { input: './global.css' });
