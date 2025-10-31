import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import colors from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProductDetail = ({ route }: any) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation();

  const addToCart = () => {
    console.log('Add to cart:', product, 'Quantity:', quantity);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        {/* Hero Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: product.images?.[0] }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Product Info */}
        <View style={styles.info}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description} numberOfLines={9}>
            {product.description.trim()}
          </Text>
          <Text style={styles.price}>${product.price}</Text>

          {/* Quantity Selector */}
          <View style={styles.quantityWrapper}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(prev => Math.max(prev - 1, 1))}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityNumber}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(prev => prev + 1)}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Add to Cart */}
          <TouchableOpacity style={styles.addButton} onPress={addToCart}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  card: {
    width: width - 30,
    height: '95%',
    elevation: 1,
  },
  imageWrapper: {
    width: '100%',
    height: 250, // Hero section - big but not full screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#6c6c70',
    marginBottom: 8,
    lineHeight: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 16,
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
  },
  quantityNumber: {
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 12,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
