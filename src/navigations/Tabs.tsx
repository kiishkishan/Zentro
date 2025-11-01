/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

const icons = {
  home: require('../assets/home.png'),
  cart: require('../assets/cart.png'),
  profile: require('../assets/profile.png'),
};

const AnimatedTabIcon = React.memo(({ focused, source }: any) => {
  const scale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.25 : 1,
      friction: 4,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [focused, scale]);

  return (
    <View style={{ alignItems: 'center' }}>
      <Animated.Image
        source={source}
        style={[
          styles.icon,
          { transform: [{ scale }], tintColor: focused ? '#fff' : '#ccc' },
        ]}
        resizeMode="contain"
      />
      {focused && <View style={styles.dot} />}
    </View>
  );
});

// ✅ moved outside — safe + lint-proof
const renderTabIcon =
  (source: any) =>
  ({ focused }: { focused: boolean }) =>
    <AnimatedTabIcon focused={focused} source={source} />;

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{ tabBarIcon: renderTabIcon(icons.home) }}
    />

    <Tab.Screen
      name="Cart"
      component={Cart}
      options={{ tabBarIcon: renderTabIcon(icons.cart) }}
    />

    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{ tabBarIcon: renderTabIcon(icons.profile) }}
    />
  </Tab.Navigator>
);

export default Tabs;

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginTop: 4,
  },
  tabBar: {
    height: 65,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    borderTopColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 8,
  },
});
