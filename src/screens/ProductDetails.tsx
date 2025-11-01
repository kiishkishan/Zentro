import React, { useEffect, useState } from 'react';
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
import { RootStackParamList } from '../types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');
interface ScrollEvent {
  nativeEvent: {
    contentOffset: {
      x: number;
    };
  };
}

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const ProductDetail = ({ route }: Props) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!product?.images || !Array.isArray(product.images)) return;

    const validImages = product.images.filter(Boolean);

    Promise.all(
      validImages.map(uri => Image.prefetch(uri).catch(() => null)),
    ).catch(() => {});
  }, [product?.images]);

  const addToCartHandler = () => {
    addToCart({
      id: product?.id,
      title: product?.title,
      price: product?.price,
      quantity: quantity,
      image: product?.images?.[0] || '',
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
      <View style={styles.headerArea}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Product Details</Text>
      </View>

      <View style={styles.card}>
        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={product?.images}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderImage}
            onScroll={onScroll}
            initialNumToRender={3}
            maxToRenderPerBatch={1}
            windowSize={3}
            removeClippedSubviews
          />

          {/* Carousel Indicators */}
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
        </View>

        {/* Product Info */}
        <View style={styles.info}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description} numberOfLines={15}>
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
  headerArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 24,
    marginTop: 16,
  },

  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginHorizontal: 60,
  },
  backArrow: { fontSize: 22, fontWeight: '700', color: colors.primary },

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
  carouselContainer: {
    width: width - 30,
    height: 265,
    position: 'relative',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
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
