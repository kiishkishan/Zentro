import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const SkeletonCard = () => {
  const shimmer = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmer]);

  const translateX = shimmer.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 200],
  });

  return (
    <View style={styles.skeletonCard}>
      {/* Image Placeholder */}
      <View style={styles.imagePlaceholder}>
        <Animated.View
          style={[styles.shimmer, { transform: [{ translateX }] }]}
        />
      </View>
      {/* Title Placeholder */}
      <View style={styles.titlePlaceholder}>
        <Animated.View
          style={[styles.shimmer, { transform: [{ translateX }] }]}
        />
      </View>
      {/* Price Placeholder */}
      <View style={styles.pricePlaceholder}>
        <Animated.View
          style={[styles.shimmer, { transform: [{ translateX }] }]}
        />
      </View>
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
    backgroundColor: '#E1E9EE',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
  shimmer: {
    flex: 1,
    backgroundColor: '#F2F8FC',
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  imagePlaceholder: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#E1E9EE',
    overflow: 'hidden',
  },
  titlePlaceholder: {
    width: '100%',
    height: 14,
    borderRadius: 4,
    marginBottom: 4,
    backgroundColor: '#E1E9EE',
    overflow: 'hidden',
  },
  pricePlaceholder: {
    width: '40%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#E1E9EE',
    overflow: 'hidden',
  },
});
