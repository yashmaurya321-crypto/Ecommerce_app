import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import {addToCart} from '../redux/cartSlice'
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../redux/wishListSlice';
const ProductScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { product } = route.params;
  const handel = (item) => {
    dispatch(addToCart(item));
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => dispatch(addToWishlist(product))}>
            <Icon name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareIcon}>
            <Icon name="share-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {/* Product Image */}
        <Image
          source={{ uri: product.image }} 
          style={styles.productImage}
        />

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productSize}>Size: X XL XXXL</Text>
          <Text style={styles.productPrice}>${product.discountedPrice}</Text>
          
          {/* Product Description */}
          <Text style={styles.productDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          </Text>

          {/* Add to Cart Button */}
          <TouchableOpacity onPress = {()=>handel(product)} style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  shareIcon: {
    marginLeft: 16,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productSize: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 20,
    color: 'black',
    marginTop: 8,
  },
  productDescription: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  addToCartButton: {
    backgroundColor: '#125B9A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductScreen;
