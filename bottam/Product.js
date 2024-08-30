import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const productsData = [
  {
    id: '1',
    brand: 'PROVOGUE',
    name: 'Men Slim Fit Black Trousers',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/jean/8/v/f/32-eps-black-03-urbano-fashion-original-imah22ffbz2v4uht.jpeg?q=70&crop=false',
    discountedPrice: '499',
    originalPrice: '1,999',
    discount: 75,
    assuredBadge: true,
    freeDelivery: true,
    gender: 'Men',
  },
  {
    id: '2',
    brand: 'PROVOGUE',
    name: 'Men Slim Fit Black Trousers',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/jean/8/v/f/32-eps-black-03-urbano-fashion-original-imah22ffbz2v4uht.jpeg?q=70&crop=false',
    discountedPrice: '499',
    originalPrice: '1,999',
    discount: 75,
    freeDelivery: true,
    gender: 'Men',
  },
  {
    id: '3',
    brand: 'PROVOGUE',
    name: 'Men Slim Fit Black Trousers',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/jean/8/v/f/32-eps-black-03-urbano-fashion-original-imah22ffbz2v4uht.jpeg?q=70&crop=false',
    discountedPrice: '499',
    originalPrice: '1,999',
    discount: 75,
    assuredBadge: true,
    freeDelivery: true,
    gender: 'Men',
  },
];

const womenProducts = [
  {
    id: '4',
    brand: 'H&M',
    name: 'Women\'s Winter Jacket',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/jacket/q/t/z/m-1-no-womens-winter-jackets-elanhood-original-imahf4zc72fznuq4.jpeg?q=70&crop=false',
    discountedPrice: '2,299',
    originalPrice: '5,499',
    discount: 58,
    assuredBadge: true,
    freeDelivery: true,
    gender: 'Women',
  },
  {
    id: '5',
    brand: 'H&M',
    name: 'Women\'s Winter Jacket',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/jacket/q/t/z/m-1-no-womens-winter-jackets-elanhood-original-imahf4zc72fznuq4.jpeg?q=70&crop=false',
    discountedPrice: '2,299',
    originalPrice: '5,499',
    discount: 58,
    assuredBadge: true,
    freeDelivery: true,
    gender: 'Women',
  },
  {
    id: '6',
    brand: 'H&M',
    name: 'Women\'s Winter Jacket',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/jacket/q/t/z/m-1-no-womens-winter-jackets-elanhood-original-imahf4zc72fznuq4.jpeg?q=70&crop=false',
    discountedPrice: '2,299',
    originalPrice: '5,499',
    discount: 58,
    assuredBadge: true,
    freeDelivery: true,
    gender: 'Women',
  },
];

const Product = ({navigation}) => {
  const [selectedGender, setSelectedGender] = useState('All');
  const products = [...productsData, ...womenProducts];

  const filteredProducts = selectedGender === 'All'
    ? products
    : products.filter(product => product.gender === selectedGender);

  const renderProduct = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductPage', { product : item })}style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
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
        keyExtractor={item => item.id}
        numColumns={2} // Display items in a grid with 2 columns
        columnWrapperStyle={styles.row} // Apply styles to each row
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
    margin: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
   
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
 
    marginRight: 5,
  },
  productOriginalPrice: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  productDiscount: {
    fontSize: 14,
    
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
});

export default Product;
