import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';

const { width } = Dimensions.get('window');

const carouselItems = [
  { id: '1', uri: 'https://rukminim2.flixcart.com/fk-p-flap/470/80/image/1bde0203b40de1e9.jpg?q=20', title: 'Discover New Styles' },
  { id: '2', uri: 'https://rukminim2.flixcart.com/fk-p-flap/470/80/image/3fada193921d4d76.jpeg?q=20', title: 'Special Offers' },
  { id: '3', uri: 'https://rukminim2.flixcart.com/fk-p-flap/470/80/image/8d7c5a9f8990a71b.jpg?q=20', title: 'Trending Now' },
];

const CustomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {carouselItems.map((item) => (
          <View key={item.id} style={styles.carouselItem}>
            <Image source={{ uri: item.uri }} style={styles.carouselImage} />
            <View style={styles.carouselTextContainer}>
              <Text style={styles.carouselTitle}>{item.title}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {carouselItems.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginVertical: 16,
  },
  scrollView: {
    width: '100%',
  },
  carouselItem: {
    width: width * 0.8,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    elevation: 4, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselTextContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 5,
  },
  carouselTitle: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCC',
    margin: 2,
  },
  activeDot: {
    backgroundColor: '#FF1493', 
  },
});

export default CustomCarousel;
