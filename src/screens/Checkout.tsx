// screens/Checkout.tsx
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types/navigation';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { CartContext } from '../context/CartContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;
type CheckoutNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Checkout'
>;

const Checkout: React.FC<Props> = ({ route }) => {
  const { total } = route.params;
  const navigation = useNavigation<CheckoutNavigationProp>();

  const { payNow } = useContext(CartContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerArea}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>Checkout</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.value}>${total?.toFixed(2) || '0.00'}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.paymentMethod}>
            <Text style={styles.paymentText}>Cash</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            payNow();
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
