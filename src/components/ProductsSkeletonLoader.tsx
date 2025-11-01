import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkeletonCard = () => {
  return (
    <View style={styles.skeletonCard}>
      {/* Image Placeholder */}
      <View style={styles.imagePlaceholder} />

      {/* Title Placeholder */}
      <View style={styles.titlePlaceholder} />

      {/* Description Placeholder */}
      <View style={styles.descriptionPlaceholder} />

      {/* Price Placeholder */}
      <View style={styles.pricePlaceholder} />
    </View>
  );
};

const ProductsSkeleton = () => {
  return (
    <View style={styles.skeletonContainer}>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
};

export default ProductsSkeleton;

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  skeletonCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: '#e9e9e9',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },
  imagePlaceholder: {
    width: '100%',
    height: 130,
    borderRadius: 16,
    backgroundColor: '#f7f7f9',
    marginBottom: 10,
  },
  titlePlaceholder: {
    width: '80%',
    height: 16,
    borderRadius: 4,
    backgroundColor: '#e1e1e1',
    marginBottom: 6,
  },
  descriptionPlaceholder: {
    width: '90%',
    height: 12,
    borderRadius: 4,
    backgroundColor: '#e1e1e1',
    marginBottom: 8,
  },
  pricePlaceholder: {
    width: '40%',
    height: 16,
    borderRadius: 4,
    backgroundColor: '#e1e1e1',
  },
});
