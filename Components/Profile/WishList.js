import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../redux/wishListSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishList = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = async (name) => {
    if (name) {
      try {
        // Fetch existing user data
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
  
          // Check if wishlist exists and is an array
          if (user.wishlist && Array.isArray(user.wishlist)) {
            // Filter out the item with the given name
            const updatedWishlist = user.wishlist.filter(item => item.name !== name);
            user.wishlist = updatedWishlist;
  
            // Save updated user data
            await AsyncStorage.setItem('user', JSON.stringify(user));
            Alert.alert('Success', 'Item removed from wishlist!');
  
            // Dispatch action to update wishlist in Redux store
            dispatch(removeFromWishlist(name));
          } else {
            Alert.alert('Error', 'Wishlist is empty or not found.');
          }
        } else {
          Alert.alert('Error', 'No user data found. Please log in.');
          // Optionally, you can redirect the user to the login screen here
          // navigation.navigate('Login'); // Uncomment if navigation prop is available
        }
      } catch (error) {
        console.error('Failed to remove item from wishlist:', error);
        Alert.alert('Error', 'Failed to remove item from wishlist.');
      }
    } else {
      console.error('Invalid item name:', name);
    }
  };

  const renderWishlistItem = ({ item }) => {
   
    

    return (
      <View style={styles.item}>
        <Image source={{ uri: item.image[0] }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.discountedPrice}</Text>
          <TouchableOpacity
            onPress={() => handleRemoveFromWishlist(item.name)}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlistItems}
        renderItem={renderWishlistItem}
        keyExtractor={(item) => item.name.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#7695FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WishList;
