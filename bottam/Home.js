import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import { Appbar, Searchbar, Avatar, Title } from 'react-native-paper';
import ProductCard from '../Components/ProductCard';
import CustomCarousel from '../Components/CustomCarousel';

const products = [
  {
    "brand": "Adidas",
    "category": "Women",
    "name": "Adidas Ultraboost 21",
    "image": ["https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/e/a/w/-original-imahfxt8drbtp7rz.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/c/w/3/-original-imahyrdbxrf8rfqs.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/0/3/l/-original-imahyrdbdfrx4ben.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/f/e/s/-original-imahyrdbjtjyn4jn.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/f/h/x/-original-imahyrdb2emvktag.jpeg?q=70&crop=false"
],
    "discountedPrice": "15,499",
    "originalPrice": "18,000",
    "discount": 14,
    "assuredBadge": false,
    "freeDelivery": true
},
{
  "brand": "H&M",
  "category": "Women",
  "name": "H&M Floral Maxi Dress",
  "image": ["https://rukminim2.flixcart.com/image/128/128/xif0q/dress/6/u/q/m-8001-zwerlon-original-imah242wngzfgytn.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/dress/g/h/j/m-8001-zwerlon-original-imah242wzgrvatka.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/dress/h/j/h/m-8001-zwerlon-original-imah242wxut2d7pf.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/dress/q/v/2/m-8001-zwerlon-original-imah242wp5rhhd4e.jpeg?q=70&crop=false"
],
  "discountedPrice": "2,299",
  "originalPrice": "2,800",
  "discount": 18,
  "assuredBadge": true,
  "freeDelivery": false
},
{
  "brand": "Clarks",
  "category": "Women",
  "name": "Clarks Desert Boots",
  "image": [
      "https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/2/f/l/12-26166779-clarks-black-sde-original-imags8r2rp4ywpu6.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/6/q/i/12-26166779-clarks-black-sde-original-imags8r2jbhdczgy.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/6/y/a/12-26166779-clarks-black-sde-original-imags8r2h2fechgp.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/g/h/m/12-26166779-clarks-black-sde-original-imags8r2cgt8hzkc.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/e/7/r/12-26166779-clarks-black-sde-original-imags8r2tf4gch9v.jpeg?q=70&crop=false"
  ],
  "discountedPrice": "8,499",
  "originalPrice": "10,000",
  "discount": 15,
  "assuredBadge": false,
  "freeDelivery": true
},
];

const topSold = [
  {
    "brand": "Dell",
    "category": "Electronics",
    "name": "Dell XPS 13",
    "image": ["https://rukminim2.flixcart.com/image/128/128/kp5sya80/screen-guard/tempered-glass/o/v/n/apple-macbook-air-m1-13-3-inch-lightwings-original-imag3gh5xftgbpg3.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/kruyw7k0/computer/7/s/m/na-thin-and-light-laptop-apple-original-imag5jt7khzzmh4w.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/kruyw7k0/computer/h/l/6/na-thin-and-light-laptop-apple-original-imag5jt7fx4gfun4.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/kruyw7k0/computer/p/s/p/na-thin-and-light-laptop-apple-original-imag5jt7zpmhsrpm.jpeg?q=70&crop=false"
],
    "discountedPrice": "89,999",
    "originalPrice": "99,999",
    "discount": 10,
    "assuredBadge": true,
    "freeDelivery": true
},
{
  "brand": "Fitbit",
  "category": "Electronics",
  "name": "Fitbit Charge 5",
  "image": ["https://rukminim2.flixcart.com/image/128/128/xif0q/smartwatch/o/r/6/1-04-fb421glwt-frcjk-android-ios-fitbit-no-original-imagh465jqnx3tac.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/smartwatch/g/f/k/1-04-fb421glwt-frcjk-android-ios-fitbit-no-original-imagh465jb5rhzqv.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/smartwatch/d/w/l/1-04-fb421glwt-frcjk-android-ios-fitbit-no-original-imagh465ryfgrfwb.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/smartwatch/9/b/t/1-04-fb421glwt-frcjk-android-ios-fitbit-no-original-imagh465duhu2fcz.jpeg?q=70&crop=false"
],
  "discountedPrice": "10,499",
  "originalPrice": "12,000",
  "discount": 13,
  "assuredBadge": true,
  "freeDelivery": true
},
{
  "brand": "Oculus",
  "category": "Electronics",
  "name": "Oculus Quest 2",
  "image": ["https://rukminim2.flixcart.com/image/128/128/xif0q/motion-controller/m/v/b/quest-2-advanced-all-in-one-vr-headset-128-gb-oculus-original-imah3hzhzgd7gumk.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/motion-controller/u/w/s/quest-2-advanced-all-in-one-vr-headset-128-gb-oculus-original-imah3hzhauuhwxgc.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/motion-controller/x/d/r/quest-2-advanced-all-in-one-vr-headset-128-gb-oculus-original-imah3hzhbdqg2qch.jpeg?q=70&crop=false"

],
  "discountedPrice": "34,999",
  "originalPrice": "39,999",
  "discount": 13,
  "assuredBadge": false,
  "freeDelivery": true
},
{
  "brand": "Zara",
  "category": "Women",
  "name": "Zara Basic Blazer",
  "image": ["https://rukminim2.flixcart.com/image/128/128/xif0q/shopsy-jumpsuit/b/1/g/m-vesko-life-style-women-original-imagrgvyjrbbsqxh.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/shopsy-jumpsuit/8/g/p/m-vesko-life-style-women-original-imagrgvyrznn9wvy.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/shopsy-jumpsuit/6/z/z/s-vesko-life-style-women-original-imagrgvy8enhazsk.jpeg?q=70&crop=false",
"https://rukminim2.flixcart.com/image/128/128/xif0q/shopsy-jumpsuit/u/u/p/m-vesko-life-style-women-original-imagrgvyskcwuse2.jpeg?q=70&crop=false"
],
  "discountedPrice": "4,999",
  "originalPrice": "6,500",
  "discount": 23,
  "assuredBadge": true,
  "freeDelivery": true
},
{
  "brand": "Clarks",
  "category": "Women",
  "name": "Clarks Desert Boots",
  "image": [
      "https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/2/f/l/12-26166779-clarks-black-sde-original-imags8r2rp4ywpu6.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/6/q/i/12-26166779-clarks-black-sde-original-imags8r2jbhdczgy.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/6/y/a/12-26166779-clarks-black-sde-original-imags8r2h2fechgp.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/g/h/m/12-26166779-clarks-black-sde-original-imags8r2cgt8hzkc.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/128/128/xif0q/shoe/e/7/r/12-26166779-clarks-black-sde-original-imags8r2tf4gch9v.jpeg?q=70&crop=false"
  ],
  "discountedPrice": "8,499",
  "originalPrice": "10,000",
  "discount": 15,
  "assuredBadge": false,
  "freeDelivery": true
}
 
];

const category = [
  {
    name: 'Electronics',
    image: 'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/0139228b2f7eb413.jpg?q=100'
  },
  {
    name: 'Men',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/shirt/l/i/b/xxl-epb1-eviqe-original-imahyg79fvjbxavw.jpeg?q=70&crop=false',
  },
  {
    name: 'Women',
    image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/top/x/e/n/xs-1-07top-nandini-new-fastion-original-imah2hhw9gfzskmm.jpeg?q=70&crop=false'
  },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [topSoldProduct, setTopSold] = useState([]);
const [Popular, setPopular] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
setPopular(products)
        setTopSold(topSold);
      } catch (error) {
        console.error('Error fetching top sold products:', error);
      }
    };
    fetchProducts();
  }, []);

  const filterProducts = (productsList) => {
    if (!Array.isArray(productsList)) {
      console.warn('Expected productsList to be an array, but got:', productsList);
      return [];
    }

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
              <Avatar.Image source={{ uri: cat.image }} size={100} style={styles.avatar} />
              <Text style={styles.categoryText}>{cat.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View>
        <Title style={styles.sectionTitle}>Popular</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filterProducts(Popular).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </ScrollView>
      </View>

      <View>
        <Title style={styles.sectionTitle}>Top Sold</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filterProducts(topSoldProduct).map((product, index) => (
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
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f8f8f8',
    elevation: 0,
  },
  avatarContainer: {
    marginLeft: 10,
  },
  appbarTitle: {
    fontWeight: 'bold',
  },
  searchBar: {
    margin: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    marginLeft: 10,
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingHorizontal: 10,
  },
  categoryContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  avatar: {
    marginBottom: 5,
  },
  categoryText: {
    textAlign: 'center',
  },
});

export default Home;
