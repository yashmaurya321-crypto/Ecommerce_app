import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice'; // Adjust the import path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Function to calculate total
  const calculateTotal = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => {
      // Ensure price and quantity are numbers
      const price = parseFloat(item.discountedPrice?.replace(/[^0-9.-]+/g, "")) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const handleRemoveFromCart = async (name) => {
    if (name) {
      try {
        // Fetch existing user data
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);

          // Check if cart exists and is an array
          if (Array.isArray(user.cart)) {
            // Filter out the item to be removed
            const updatedCart = user.cart.filter(item => item.name !== name);
            user.cart = updatedCart;

            // Save updated user data
            await AsyncStorage.setItem('user', JSON.stringify(user));
            Alert.alert('Success', 'Item removed from cart!');

            // Dispatch action to update cart in Redux store
            dispatch(removeFromCart(name));
          } else {
            Alert.alert('Error', 'No cart found.');
          }
        } else {
          Alert.alert('Error', 'No user data found. Please log in.');
          // Navigate to login or handle appropriately
        }
      } catch (error) {
        console.error('Failed to remove item from cart:', error);
        Alert.alert('Error', 'Failed to remove item from cart.');
      }
    } else {
      console.error('Invalid item name:', name);
    }
  };

  // Filter out items with invalid properties
  const validCartItems = cartItems.filter(item =>
    item.name && item.discountedPrice && item.image && item.image.length > 0
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.image[0] }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${(parseFloat(item.discountedPrice.replace(/[^0-9.-]+/g, "")) || 0).toFixed(2)}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity || 0}</Text>
        <TouchableOpacity onPress={() => handleRemoveFromCart(item.name)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={validCartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.name ? item.name.toString() : '0'}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.totalContainer}>
        {/* Displaying the total amount */}
        <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    paddingTop: 40,
  },
  cartList: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#7695FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#125B9A',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  checkoutButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Cart;
