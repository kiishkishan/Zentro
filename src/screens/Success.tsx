import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabParamList, RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const generateOrderNumber = () => {
  return 'ORD-' + Math.floor(100000 + Math.random() * 900000); // 6-digit order number
};

type SuccessScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'Success'>,
  BottomTabNavigationProp<BottomTabParamList>
>;

type Props = {
  navigation: SuccessScreenNavigationProp;
};

const Success: React.FC<Props> = () => {
  const navigation = useNavigation<SuccessScreenNavigationProp>();

  // Generate order number once per render
  const orderNumber = useMemo(() => generateOrderNumber(), []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Success Icon */}
        <View style={styles.iconWrapper}>
          <Text style={styles.successIcon}>✓</Text>
        </View>

        {/* Heading */}
        <Text style={styles.heading}>Order Placed!</Text>

        {/* Order Number */}
        <Text style={styles.orderNumber}>Order #{orderNumber}</Text>

        {/* Message */}
        <Text style={styles.message}>
          Your order has been successfully placed. You will receive a
          confirmation soon.
        </Text>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Success;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.base },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary + '33', // subtle primary tint
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successIcon: { fontSize: 40, color: colors.primary, fontWeight: '700' },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: colors.textTitle,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
