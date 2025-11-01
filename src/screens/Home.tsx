import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/productsThunk';
import ProductCard from '../components/ProductCard';
import colors from '../theme/colors';
import ProductsSkeleton from '../components/ProductsSkeletonLoader';

const Home = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { items, loading, error, page, hasMore } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts({ offset: page, limit: 20 }));
  }, [dispatch, page]);

  const loadMore = () => {
    if (!loading && hasMore)
      dispatch(fetchProducts({ offset: page, limit: 20 }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Products</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading && items.length === 0 ? (
        <ProductsSkeleton />
      ) : (
        <FlatList
          data={items.slice(0, 16)}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={() => navigation.navigate('Details', { product: item })}
            />
          )}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          columnWrapperStyle={styles.columnWrapper}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            loading && items.length > 0 ? (
              <ActivityIndicator style={styles.loadingIndicator} />
            ) : null
          }
          contentContainerStyle={styles.contentContainer}
          removeClippedSubviews={true}
          maxToRenderPerBatch={8}
          initialNumToRender={8}
          getItemLayout={(_, index) => ({
            length: 250,
            offset: 250 * index,
            index,
          })}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  errorText: { color: 'red', textAlign: 'center', marginVertical: 8 },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  loadingIndicator: { margin: 16 },
  contentContainer: { paddingBottom: 50 },
});
