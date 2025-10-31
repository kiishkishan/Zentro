import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import ProductDetails from '../screens/ProductDetails';
import Checkout from '../screens/Checkout';
import Success from '../screens/Success';

const Stack = createNativeStackNavigator();

const RootStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs" component={Tabs} />
    <Stack.Screen name="Details" component={ProductDetails} />
    <Stack.Screen name="Checkout" component={Checkout} />
    <Stack.Screen name="Success" component={Success} />
  </Stack.Navigator>
);

export default RootStack;
