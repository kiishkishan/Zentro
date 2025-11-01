import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import colors from '../theme/colors';
import TopBar from '../components/TopBar';
import TabIcon from '../components/TabIcon';

const Tab = createBottomTabNavigator();

const icons = {
  home: require('../assets/home.png'),
  cart: require('../assets/cart.png'),
  profile: require('../assets/profile.png'),
};

const TopHeader = () => <TopBar />;

const renderTabIcon =
  (source: any, label: string) =>
  ({ focused }: any) =>
    <TabIcon focused={focused} source={source} label={label} />;

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: renderTabIcon(icons.home, 'Home'),
        header: () => TopHeader(),
      }}
    />
    <Tab.Screen
      name="Cart"
      component={Cart}
      options={{
        tabBarIcon: renderTabIcon(icons.cart, 'Cart'),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: renderTabIcon(icons.profile, 'Profile'),
        header: () => TopHeader(),
      }}
    />
  </Tab.Navigator>
);

export default Tabs;

const styles = StyleSheet.create({
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
