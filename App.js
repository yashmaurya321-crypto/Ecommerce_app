import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import Home from './bottam/Home';
import Profile from './bottam/Profile';
import Cart from './bottam/Cart';
import Product from './bottam/Product';
import ProductScreen from './Components/ProductScreen';
import Support from './Components/Profile/Support';
import WishList from './Components/Profile/WishList';
import Setting from './Components/Profile/Setting';
import MyOrder from './Components/Profile/MyOrder';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './Components/Login';
import Register from './Components/Register';
import { addToCart } from './redux/cartSlice'; // Adjust the import based on your action file
import {addToWishlist} from './redux/wishListSlice'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={Home} />
      <Stack.Screen
        name="ProductPage"
        component={ProductScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTintColor: 'black',
        }}
      />
    </Stack.Navigator>
  );
}

function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductScreen" options={{ headerShown: false }} component={Product} />
      <Stack.Screen
        name="ProductPage"
        component={ProductScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTintColor: 'black',
        }}
      />
    </Stack.Navigator>
  );
}

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} component={Profile} />
      <Stack.Screen name="OrderScreen" component={MyOrder} options={{ headerShown: false }} />
      <Stack.Screen name="SettingScreen" component={Setting} />
      <Stack.Screen name="WishListScreen" component={WishList} />
      <Stack.Screen name="SupportScreen" component={Support} />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Profile':
              iconName = 'account';
              break;
            case 'Cart':
              iconName = 'cart';
              break;
            case 'Product':
              iconName = 'shopping';
              break;
            default:
              iconName = 'home';
              break;
          }

          return (
            <View style={styles.iconWrapper}>
              <Icon name={iconName} color={color} size={size} />
            </View>
          );
        },
        tabBarActiveTintColor: '#7695FF',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e0e0e0',
          borderTopWidth: 1,
          elevation: 8,
          height: 70,
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 8,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Product" component={ProductStack} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        setIsAuthenticated(!!user);

        if (user) {
          const userData = JSON.parse(user);

         
          if (userData.cart) {
            dispatch(addToCart(...userData.cart));
            console.log('Cart items added from AsyncStorage:', userData.cart);
            console.log('User', userData);
          }
          if(userData.wishlist){
            dispatch(addToWishlist(...userData.wishlist));
            console.log('Wishlist items added from AsyncStorage:', userData.wishlist);
            console.log('User', userData);
          }
        }
      } catch (error) {
        console.error('Failed to check authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [dispatch]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    padding: 10,
  },
});
