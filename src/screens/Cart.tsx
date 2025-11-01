import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { CartContext } from '../context/CartContext';
import colors from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

const ItemSeparator = () => <View style={styles.separator} />;

const Cart = () => {
  const { cart, addToCart } = useContext(CartContext);

  const navigation = useNavigation();

  const increaseQty = (item: any) => {
    addToCart({ ...item, quantity: item.quantity + 1 });
  };

  const decreaseQty = (item: any) => {
    if (item.quantity > 1) {
      addToCart({ ...item, quantity: item.quantity - 1 });
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.cartItem}>
      {/* Checkbox Placeholder */}
      <View style={styles.checkbox} />

      {/* Product Image */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.brand}>{item.description?.slice(0, 15)}...</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      {/* Quantity Controls */}
      <View style={styles.qtyContainer}>
        <TouchableOpacity onPress={() => increaseQty(item)}>
          <Text style={styles.qtyBtn}>+</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => decreaseQty(item)}>
          <Text style={styles.qtyBtn}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Text style={styles.iconText}>←</Text>
          {/* Replace with back icon later */}
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Cart</Text>

        <TouchableOpacity style={styles.iconButton}>
          {/* Trash icon from assets — tint white later */}
          <Text style={styles.iconText}>🗑️</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cart}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
      />

      {/* Bottom Bill */}
      <View style={styles.billBox}>
        <View style={styles.billRow}>
          <Text style={styles.billText}>Subtotal</Text>
          <Text style={styles.billText}>$90.00</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billText}>VAT</Text>
          <Text style={styles.billText}>$2.00</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billText}>Shipping</Text>
          <Text style={styles.billText}>$0.00</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>$92.00</Text>
        </View>

        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    color: colors.textTitle,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textTitle,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  brand: {
    fontSize: 12,
    color: colors.textMuted,
  },
  price: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 16,
    marginTop: 4,
  },
  qtyContainer: {
    width: 65,
    alignItems: 'center',
  },
  qtyBtn: {
    fontSize: 18,
    fontWeight: '700',
    padding: 4,
    color: colors.primary,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 4,
  },
  separator: {
    height: 12,
  },
  billBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  billText: {
    fontSize: 14,
    color: colors.textSemiMuted,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textTitle,
  },
  checkoutBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
});
