import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import ProductDetails from '../screens/ProductDetails';
import Success from '../screens/Success';
import Checkout from '../screens/Checkout';

const Stack = createNativeStackNavigator();

const DetailsScreen = (props: any) => <ProductDetails {...props} />;

const CheckoutScreen = (props: any) => <Checkout {...props} />;

const SuccessScreen = (props: any) => <Success {...props} />;

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
      component={CheckoutScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Success"
      component={SuccessScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default RootStack;
