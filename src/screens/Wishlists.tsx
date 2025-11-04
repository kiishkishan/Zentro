import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useAppSelector } from '../store/hooks';
import ProductCard from '../components/ProductCard';
import colors from '../theme/colors';
import { Product } from '../types/product';

const PAGE_SIZE = 10; // Number of items to load per scroll

const WishlistScreen = ({ navigation }: any) => {
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const [page, setPage] = useState(1);

  const handleLoadMore = () => {
    if (page * PAGE_SIZE < wishlistItems.length) {
      setPage(prev => prev + 1);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        item={item}
        onPress={() => navigation.navigate('Details', { product: item })}
      />
    ),
    [navigation],
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Product Details</Text>
      </View>
      {wishlistItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items in your wishlist yet.</Text>
        </View>
      ) : (
        <FlatList
          data={wishlistItems.slice(0, page * PAGE_SIZE)}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textMuted,
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
});

export default WishlistScreen;
