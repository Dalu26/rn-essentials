module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: ['@babel/plugin-proposal-export-namespace-from',
      [
        'module-resolver',
        {
          alias: {
            'assets': './src/assets',
            'components': './src/components',
            'screens': './src/screens',
            'libs': './src/libs',
            'data': './src/data',
            'navigation': './src/navigation',
            'svgs': './src/assets/svgs',
            'utils': './src/utils',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
};