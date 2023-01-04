module.exports = {
  assets: ['./src/assets/fonts'],
  getTransformModulePath() {
    return require.resolve(
      'react-native-config/lib/rn-get-transform-module-path',
    );
  },
  getSourceExts() {
    return ['ts', 'tsx', 'js', 'jsx'];
  },
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};
