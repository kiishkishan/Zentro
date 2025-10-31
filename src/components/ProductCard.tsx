import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import colors from '../theme/colors';

const ProductCard = ({ item, onPress }: any) => {
  const [loaded, setLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [loaded, fadeAnim]);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.imageWrapper}>
        {!loaded && <View style={[styles.image, styles.skeletonBackground]} />}

        <Animated.Image
          source={{ uri: item.images?.[0] }}
          style={[styles.image, { opacity: fadeAnim }]}
          resizeMode="contain"
          onLoadEnd={() => setLoaded(true)}
        />
      </View>

      <Text numberOfLines={1} style={styles.title}>
        {item.title}
      </Text>

      <Text numberOfLines={2} style={styles.description}>
        {item.description}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },

  imageWrapper: {
    width: '100%',
    height: 130,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 2,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '120%',
    height: '120%',
    alignSelf: 'center',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },

  skeletonBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#e1e1e1',
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1c1c1e',
    marginBottom: 4,
  },

  description: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 8,
  },

  footer: {
    borderTopWidth: 0.6,
    borderTopColor: colors.border,
    paddingTop: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
});

export default ProductCard;
