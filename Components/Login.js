import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const checkUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);

      if (user && user.email === email && user.password === password) {
        Alert.alert('Success', 'Login successful!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'ProfileScreen' }],
        });
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Failed to retrieve user data');
    }
  };

  const handleLogin = () => {
    if (email && password) {
      checkUser();
    } else {
      setError('Please enter both email and password');
    }
  };

  const handleRetry = () => {
    setError(null); // Clear the error message
    handleLogin(); // Retry login
  };

  const handleReload = async () => {
    try {
      await Updates.reloadAsync(); // Reload the app
    } catch (error) {
      Alert.alert('Error', 'Failed to reload the app');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Image source={require('../assets/r.png')} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          
          <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
            <Text style={styles.reloadButtonText}>Reload App</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.loginRedirect}>
        <Text style={styles.loginText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.loginLink}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 50,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#7695FF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#ff6f61',
    fontSize: 16,
    fontWeight: 'bold',
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#7695FF',
    borderRadius: 5,
    marginTop: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reloadButton: {
    padding: 10,
    backgroundColor: '#ff6f61',
    borderRadius: 5,
    marginTop: 10,
  },
  reloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginRedirect: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#888',
  },
  loginLink: {
    color: '#7695FF',
    marginLeft: 5,
  },
});

export default Login;
