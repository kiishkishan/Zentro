module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // Recommended tweaks for RN Production
    'react-native/no-inline-styles': 'warn',
    'react-native/no-unused-styles': 'warn',
    'no-unused-vars': 'warn',
  },
};
