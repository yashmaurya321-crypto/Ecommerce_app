import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const NewProductCard = ({ product }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>₹{product.discountedPrice}</Text>
          <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
          <Text style={styles.discount}>{product.discount}% off</Text>
        </View>
        {product.freeDelivery && <Text style={styles.freeDelivery}>Free Delivery</Text>}
        {product.assuredBadge && <Text style={styles.assured}>Assured</Text>}
      </View>
    </View>
  )
}

export default NewProductCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width : "54px"
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  brand: {
    fontSize: 14,
    color: '#666',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    fontSize: 14,
    color: 'green',
  },
  freeDelivery: {
    fontSize: 12,
    color: 'green',
    marginTop: 4,
  },
  assured: {
    fontSize: 12,
    color: 'blue',
    marginTop: 4,
  },
})