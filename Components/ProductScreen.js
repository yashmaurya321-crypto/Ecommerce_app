import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { addToWishlist } from '../redux/wishListSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProductScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { product } = route.params;

  React.useEffect(() => {
    console.log('Product:', product);
  }, [product]);

  const handleAddToCart = async (item) => {
    if (item && item.name && item.discountedPrice) {
      try {
        // Fetch existing user data
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
  
          // Initialize cart if it doesn't exist
          if (!user.cart) {
            user.cart = [];
          }
  
          // Update cart
          const updatedCart = [...user.cart, item];
          user.cart = updatedCart;
  
          // Save updated user data
          await AsyncStorage.setItem('user', JSON.stringify(user));
          Alert.alert('Success', 'Cart updated!');
  
          // Dispatch action to update cart in Redux store
          dispatch(addToCart(item));
        } else {
          Alert.alert('Error', 'No user data found. Please log in.');
         
          navigation.navigate('Login'); 
        }
      } catch (error) {
        console.error('Failed to update cart:', error);
        Alert.alert('Error', 'Failed to update cart.');
      }
    } else {
      console.error('Invalid product:', item);
    }
  };
  const handleAddToWishlist = async (item) => {
    if (item && item.name && item.discountedPrice) {
      try {
        // Fetch existing user data
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
  
          // Check if wishlist exists and is an array
          const updatedWishlist = user.wishlist ? [...user.wishlist, item] : [item];
          user.wishlist = updatedWishlist;
  
          // Save updated user data
          await AsyncStorage.setItem('user', JSON.stringify(user));
          Alert.alert('Success', 'Item added to wishlist!');
  
          // Dispatch action to update wishlist in Redux store
          dispatch(addToWishlist(item));
        } else {
          Alert.alert('Error', 'No user data found. Please log in.');
          // Optionally, you can redirect the user to the login screen here
          // navigation.navigate('Login'); // Uncomment if navigation prop is available
        }
      } catch (error) {
        console.error('Failed to add item to wishlist:', error);
        Alert.alert('Error', 'Failed to add item to wishlist.');
      }
    } else {
      console.error('Invalid product:', item);
    }
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => handleAddToWishlist(product)}>
            <Icon name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareIcon}>
            <Icon name="share-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {/* Product Images Carousel */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {product.image && product.image.length > 0 ? (
            product.image.map((imgSrc, index) => (
              <Image
                key={index}
                source={{ uri: imgSrc || 'fallback-image-url' }}
                style={styles.productImage}
              />
            ))
          ) : (
            <Text>No images available</Text>
          )}
        </ScrollView>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name || 'Product Name'}</Text>
          <Text style={styles.productSize}>Size: X XL XXXL</Text>
          <Text style={styles.productPrice}>${product.discountedPrice || '0.00'}</Text>

          {/* Product Description */}
          <Text style={styles.productDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Text>

          {/* Add to Cart Button */}
          <TouchableOpacity onPress={() => handleAddToCart(product)} style={styles.addToCartButton}>
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
    width: 350,
    height: 300,
    resizeMode: 'contain',
    marginHorizontal: 10,
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
