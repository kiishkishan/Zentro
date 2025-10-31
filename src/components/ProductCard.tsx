import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme/colors';

const ProductCard = ({ item, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Image source={{ uri: item.images?.[0] }} style={styles.image} />
      <Text numberOfLines={1} style={styles.title}>
        {item.title}
      </Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
    color: colors.accent,
  },
});

export default ProductCard;
