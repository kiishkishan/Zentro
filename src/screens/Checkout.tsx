import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import colors from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types/navigation';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;
type CheckoutNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Checkout'
>;

const Checkout: React.FC<Props> = ({ route }: Props) => {
  const navigation = useNavigation<CheckoutNavigationProp>();
  const { total, onPay } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerArea}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>Checkout</Text>
        </View>

        {/* Total Value */}
        <View style={styles.card}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.value}>${total?.toFixed(2) || '0.00'}</Text>
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.paymentMethod}>
            <Text style={styles.paymentText}>Cash</Text>
          </View>
        </View>

        {/* Pay Now Button */}
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            if (onPay) onPay();
            else Alert.alert('Payment', 'Pay Now clicked!');
            navigation.navigate('Success');
          }}
        >
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.base },
  container: { flex: 1, padding: 20 },
  headerArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginHorizontal: 100,
  },
  backArrow: { fontSize: 22, fontWeight: '700', color: colors.primary },
  card: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },
  paymentMethod: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  payButton: {
    marginTop: 'auto',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
