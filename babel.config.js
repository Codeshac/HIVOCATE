module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
          // REMOVED: blacklist: null, (deprecated)
          // REMOVED: whitelist: null, (deprecated)
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            '@': './',
            '@screens': './src/screens',
            '@components': './src/components',
            '@assets': './assets',
            '@utils': './src/utils',
          },
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        },
      ],
      // Keep ONLY if you're actually using react-native-worklets
      //'react-native-worklets/plugin',

      // 👇 Must always be LAST
      
    ],
  };
};