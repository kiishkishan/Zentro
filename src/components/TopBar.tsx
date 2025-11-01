import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../theme/colors';

const TopBar = () => {
  return (
    <View style={styles.topBar}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')} // logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Zentro</Text>
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  topBar: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 12,
    zIndex: 4,
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
});
