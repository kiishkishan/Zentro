/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartContext } from '../context/CartContext';
import colors from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import typography from '../theme/typography';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const ItemSeparator = () => <View style={{ height: 14 }} />;

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

// Type the navigation
type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Checkout'
>;

const Cart = () => {
  const { cart, updateQuantity, clearCart } = useContext(CartContext);
  const navigation = useNavigation<CartScreenNavigationProp>();

  const increaseQty = (item: CartItem) => {
    console.log('item - increaseQty', item);
    updateQuantity(item.id, 'inc');
  };

  const decreaseQty = (item: CartItem) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, 'dec');
    }
  };

  // Inside your Cart component, before render
  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const vatTax = subTotal * 0.1; // 10% VAT tax
  const shipping = subTotal > 100 || cart.length === 0 ? 0 : 5;

  const total = subTotal + vatTax + shipping;

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      {/* Product Image */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Info */}
      <View style={styles.infoBox}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      {/* Horizontal Qty Box */}
      <View style={styles.qtyBox}>
        <TouchableOpacity
          onPress={() => decreaseQty(item)}
          style={styles.qtyBtnBox}
        >
          <Text style={styles.qtyBtn}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qtyText}>{item.quantity}</Text>

        <TouchableOpacity
          onPress={() => increaseQty(item)}
          style={styles.qtyBtnBox}
        >
          <Text style={styles.qtyBtn}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeViewWrap}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
          <TouchableOpacity onPress={() => clearCart()}>
            <Image
              source={require('../assets/trash.png')}
              style={styles.trashIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={cart}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        />

        {/* Bill Section */}
        <View style={styles.billBox}>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Subtotal</Text>
            <Text style={styles.billValue}>
              ${subTotal?.toFixed(2) || '0.00'}
            </Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>VAT Tax (10%)</Text>
            <Text style={styles.billValue}>
              ${vatTax?.toFixed(2) || '0.00'}
            </Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Shipping</Text>
            <Text style={styles.billValue}>
              ${shipping?.toFixed(2) || '0.00'}
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>
              ${total?.toFixed(2) || '0.00'}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              ...styles.checkoutBtn,
              backgroundColor: cart.length === 0 ? colors.base : colors.primary,
            }}
            onPress={() =>
              navigation.navigate('Checkout', {
                total,
                onPay: () => {
                  clearCart();
                },
              })
            }
            disabled={cart.length === 0}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  safeViewWrap: {
    flex: 1,
    backgroundColor: '#EDEAF5',
  },
  container: {
    flex: 1,
    backgroundColor: '#EDEAF5',
    paddingHorizontal: 16,
    paddingBottom: 80, // to avoid overlap the checkout button with bottom navigation
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  backArrow: { fontSize: 22, fontWeight: '700', color: colors.primary },
  headerTitle: { fontSize: 20, fontWeight: '800', color: colors.textTitle },
  trashIcon: { width: 40, height: 40 },

  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginHorizontal: 5,
  },

  infoBox: { flex: 1, marginStart: 12 },
  title: {
    fontSize: 15,
    fontWeight: typography.bold,
    color: colors.textTitle,
  },
  price: {
    color: colors.primary,
    fontWeight: typography.extraBold,
    fontSize: 16,
    marginTop: 4,
  },

  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },

  qtyBtnBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3ECFD', // soft lavender like design
  },

  qtyBtn: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },

  qtyText: { fontSize: 15, fontWeight: '700', marginVertical: 3 },

  billBox: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    marginTop: 18,
  },

  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  billLabel: { color: '#777', fontSize: 14 },
  billValue: { fontSize: 14, color: '#444' },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  totalLabel: { fontSize: 18, fontWeight: '800', color: '#1c1c1e' },
  totalAmount: { fontSize: 18, fontWeight: '800', color: colors.primary },

  checkoutBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
