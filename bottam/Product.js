import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Electronics from '../Electronics';
import Men from '../Men';
import Girl from '../Girl';
const Product = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch Women Products
     


      const combinedProducts = [...Men, ...Electronics, ...Girl].map((product, index) => ({
        ...product,
        uniqueKey: `${index}`,
      }));

      setProducts(combinedProducts);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedGender === 'All'
    ? products
    : products.filter(product => product.category === selectedGender);

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('ProductPage', { product: item })}
      style={styles.productCard}
    >
      <Image source={{ uri: item.image[0] }} style={styles.productImage} />
      <View style={styles.textContainer}>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productDiscountedPrice}>${item.discountedPrice}</Text>
          <Text style={styles.productOriginalPrice}>${item.originalPrice}</Text>
        </View>
        <Text style={styles.productDiscount}>-{item.discount}%</Text>
        {item.assuredBadge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Assured</Text>
          </View>
        )}
        {item.freeDelivery && (
          <Text style={styles.freeDeliveryText}>Free Delivery</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#7695FF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedGender === 'All' && styles.selectedFilter]}
          onPress={() => setSelectedGender('All')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedGender === 'Men' && styles.selectedFilter]}
          onPress={() => setSelectedGender('Men')}
        >
          <Text style={styles.filterText}>Men</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedGender === 'Women' && styles.selectedFilter]}
          onPress={() => setSelectedGender('Women')}
        >
          <Text style={styles.filterText}>Women</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.uniqueKey}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#7695FF',
    paddingTop: 40,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFilter: {
    backgroundColor: '#125B9A',
  },
  filterText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  productList: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 10,
  },
  productBrand: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  productDiscountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 5,
  },
  productOriginalPrice: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  productDiscount: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 5,
  },
  badge: {
    backgroundColor: '#7695FF',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  badgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  freeDeliveryText: {
    fontSize: 12,
    color: '#333',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#7695FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Product;