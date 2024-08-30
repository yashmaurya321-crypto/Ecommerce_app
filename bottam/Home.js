import React from 'react';
import { View, StyleSheet, ScrollView, Image, Text,useColorScheme } from 'react-native';
import { Appbar, Searchbar, Card, Title, Paragraph, Avatar, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomCarousel from '../Components/CustomCarousel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProductCard from '../Components/ProductCard';
const products = [
  {
    id : 1,
    brand: 'PROVOGUE',
    name: 'Men Slim Fit Black Trousers',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/jean/8/v/f/32-eps-black-03-urbano-fashion-original-imah22ffbz2v4uht.jpeg?q=70&crop=false',
    discountedPrice: '499',
    originalPrice: '1,999',
    discount: 75,
    assuredBadge: true,
    freeDelivery: true,
  },
  {
    id : 2,
    brand: 'BLIVE',
    name: 'Men Cargos',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/cargo/k/i/b/l-bblcargo-p21-blive-original-imagzgu5enzrgq2y.jpeg?q=70&crop=false',
    discountedPrice: '399',
    originalPrice: '1,999',
    discount: 80,
    assuredBadge: true,
    freeDelivery: true,
    hotDeal: true,
  },
  {
    id : 3,
    brand: 'COMBRAIDED',
    name: 'Men Slim Fit Grey Trousers',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/trouser/9/l/w/32-bi-trouser-combraided-original-imagqtjmgrqzuhsz.jpeg?q=70&crop=false',
    discountedPrice: '299',
    originalPrice: '1,499',
    discount: 80,
    assuredBadge: true,
    freeDelivery: true,
  },
];

const topSold = [
  {
    id : 4,
    brand: 'ZARA',
    name: 'Women\'s Casual Dress',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/dress/9/m/7/xl-637dtk7712a-selvia-original-imahfbcysp3nhtfa.jpeg?q=70&crop=false',
    discountedPrice: '1,299',
    originalPrice: '3,999',
    discount: 68,
    assuredBadge: true,
    freeDelivery: true,
  },
  {
    id : 5,
    brand: 'H&M',
    name: 'Women\'s Winter Jacket',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/jacket/q/t/z/m-1-no-womens-winter-jackets-elanhood-original-imahf4zc72fznuq4.jpeg?q=70&crop=false',
    discountedPrice: '2,299',
    originalPrice: '5,499',
    discount: 58,
    assuredBadge: true,
    freeDelivery: true,
    hotDeal: true,
  },
  {
    id : 6,
    brand: 'LEVI\'S',
    name: 'Men\'s Regular Fit Jeans',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/jean/6/1/l/-original-imagj4qqtzbfzpby.jpeg?q=70&crop=false',
    discountedPrice: '899',
    originalPrice: '2,499',
    discount: 64,
    assuredBadge: true,
    freeDelivery: true,
  },
  {
    id : 7,
    brand: 'ADIDAS',
    name: 'Men\'s Sports Shoes',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/4/e/7/9-rng-830-wht-9-bruton-white-original-imahfvdypxsc3wft.jpeg?q=70&crop=false',
    discountedPrice: '1,299',
    originalPrice: '3,499',
    discount: 63,
    assuredBadge: true,
    freeDelivery: true,
  },
  {
    id : 8,
    brand: 'SAMSUNG',
    name: 'Samsung Galaxy S21',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/mobile/d/o/c/-original-imagtnqjmfqxxbj2.jpeg?q=70&crop=false',
    discountedPrice: '69,999',
    originalPrice: '79,999',
    discount: 12,
    assuredBadge: true,
    freeDelivery: true,
    hotDeal: true,
  },
  {
    id : 9,
    brand: 'APPLE',
    name: 'Apple AirPods Pro',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/headphone/e/a/f/-original-imagtc44nk4b3hfg.jpeg?q=70&crop=false',
    discountedPrice: '24,999',
    originalPrice: '29,900',
    discount: 16,
    assuredBadge: true,
    freeDelivery: true,
    
  },
];
 const category = [
    {
        name : 'Electronics',
        image : 'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/0139228b2f7eb413.jpg?q=100'
    },
    {
        name : 'Men',
        image : 'https://rukminim2.flixcart.com/image/128/128/xif0q/shirt/l/i/b/xxl-epb1-eviqe-original-imahyg79fvjbxavw.jpeg?q=70&crop=false',
    },
    {
        name : 'Women', 
        image : 'https://rukminim2.flixcart.com/image/128/128/xif0q/top/x/e/n/xs-1-07top-nandini-new-fastion-original-imah2hhw9gfzskmm.jpeg?q=70&crop=false'
    },
   
 ]
const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Function to filter products based on search query
  const filterProducts = (productsList) => {
    return productsList.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={50}
            source={{ uri: 'https://rukminim2.flixcart.com/image/1350/1350/xif0q/t-shirt/o/b/x/m-451-drkbrown-lime-original-imagyyxefmfbddvx.jpeg?q=70&crop=false' }}
          />
        </View>
        <Appbar.Content title="Hi, TAODAI" titleStyle={styles.appbarTitle} />
        
       
      </Appbar.Header>

      <Searchbar
        placeholder="Search for what you want..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <CustomCarousel />
      <View>
      <Title style={styles.sectionTitle}>Category</Title>
      <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      {category.map((cat, index) => (
        <View key={index} style={styles.categoryContainer}>
          <Avatar.Image source={{uri : cat.image}} size={100} style={styles.avatar} />
          <Text style={styles.categoryText}>{cat.name}</Text>
        </View>
      ))}
    </ScrollView>
      </View>
      <View>
        <Title style={styles.sectionTitle}>Popular</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filterProducts(products).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </ScrollView>
      </View>

      <View>
        <Title style={styles.sectionTitle}>Top Sold</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filterProducts(topSold).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </ScrollView>
      </View>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  categoryContainer: {
    alignItems: 'center',
    marginRight: 20, // Space between items
    borderRadius: 10, // Rounded corners
    overflow: 'hidden',
  
    padding: 10, // Space inside each category container
  },
  avatar: {
    
    backgroundColor: '#fff', // Background color for the avatar
  },
  categoryText: {
    marginTop: 8, // Space between avatar and text
    fontSize: 18, // Text size
    fontWeight: 'bold', // Text weight
    color: '#333', // Text color
  },
  header: {
    backgroundColor: 'white',
  },
  avatarContainer: {
    marginLeft: 16,
    marginRight: 10,
  },
  appbarTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  searchBar: {
    margin: 16,
    backgroundColor: 'rgb(227,224,227)',
    borderRadius: 20,
    elevation: 3,
  },
  coinText: {
    fontSize: 26, // Adjust font size as needed
    color: 'black',
  },
  iconWrapper: {
    backgroundColor: 'yellow',
    borderRadius: 50,
    padding: 5,
    marginRight: 10,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2, 
    flexDirection: 'row',
  },
  sectionTitle: {
    marginLeft: 16,
    marginTop: 16,
    fontWeight: 'bold',
    fontSize: 22,
    color: '#333',
    marginBottom: 15,
  },
  coinIcon: {
    marginLeft: 16, 
  },
  productCard: {
    width: 200,
    marginLeft: 16,
    marginRight: 8,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
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
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
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
  assuredBadge: {
    width: 77,
    height: 24,
    resizeMode: 'contain',
    marginTop: 4,
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

export default Home;
