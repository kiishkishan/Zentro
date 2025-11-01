import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import colors from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import typography from '../theme/typography';

import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const { width } = Dimensions.get('window');

interface Product {
  id: number;
  images: string[];
  title: string;
  description: string;
  price: number;
}

interface ProductDetailProps {
  route: {
    params: {
      product: Product;
    };
  };
}

interface ScrollEvent {
  nativeEvent: {
    contentOffset: {
      x: number;
    };
  };
}

const ProductDetail = ({ route }: ProductDetailProps) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      image: product.images?.[0] || '',
    });

    console.log('Added to cart:', product.title);
  };

  const renderImage = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
  );

  const onScroll = (event: ScrollEvent) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (width - 30));
    setActiveIndex(index);
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
        {/* Image Carousel */}
        <FlatList
          data={product.images}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderImage}
          onScroll={onScroll}
        />

        {/* Carousel indicators */}
        <View style={styles.indicatorWrapper}>
          {product.images.map((_: any, i: number) => (
            <View
              key={i}
              style={[
                styles.indicator,
                { opacity: Number(i === activeIndex ? 1.0 : 0.3) },
              ]}
            />
          ))}
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
          <TouchableOpacity style={styles.addButton} onPress={addToCartHandler}>
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    borderRadius: 8,
    elevation: 5,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 5,
  },
  backText: {
    fontSize: 16,
    fontWeight: typography.semiBold,
    color: colors.textTitle,
    backgroundColor: colors.surface,
  },
  card: {
    width: width - 30,
    height: '95%',
    elevation: 1,
    zIndex: 1,
  },
  image: {
    width: width - 30,
    height: 265,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  indicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginHorizontal: 4,
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: typography.bold,
    color: colors.textTitle,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: colors.textSemiMuted,
    marginBottom: 8,
    lineHeight: 18,
  },
  price: {
    fontSize: 22,
    fontWeight: typography.extraBold,
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
