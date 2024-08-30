import React from 'react';
import { View, StyleSheet , TouchableOpacity} from 'react-native';
import { Card, Title, Paragraph, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
const ProductCard = ({ product }) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductPage', { product })}>
    <Card style={styles.productCard}>
      <Card.Cover source={{ uri: product.image }} style={styles.productImage} />
      <Icon name="heart-outline" size={24} color="#888" style={styles.heartIcon} />
      <Card.Content>
        <Title style={styles.productTitle}>{product.brand}</Title>
        <Paragraph style={styles.productDescription}>{product.name}</Paragraph>
        <View style={styles.priceContainer}>
          <View style={styles.iconWrapper}>
           
            <Paragraph style={styles.price}>${product.discountedPrice}</Paragraph>
           
          </View>
          
          
        </View>
        {product.freeDelivery && <Paragraph style={styles.freeDelivery}>Free delivery</Paragraph>}
        {product.hotDeal && <Badge style={styles.hotDealBadge}>Hot Deal</Badge>}
      </Card.Content>
    </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: 200,
    marginLeft: 16,
    marginRight: 8,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  productImage: {
    height: 200,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 4,
  },
  iconWrapper: {
   
  },
  coinIcon: {
    marginRight: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    fontSize: 14,
    color: 'green',
  },
  freeDelivery: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  hotDealBadge: {
    backgroundColor: '#FF9900',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
});

export default ProductCard;
