import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import ProductDetails from '../screens/ProductDetails';
import Checkout from '../screens/Checkout';
import Success from '../screens/Success';

const Stack = createNativeStackNavigator();

const DetailsScreen = (props: any) => <ProductDetails {...props} />;

const RootStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs" component={Tabs} />
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Checkout"
      component={Checkout}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Success"
      component={Success}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default RootStack;
