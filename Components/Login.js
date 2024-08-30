import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
const Login = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
  
    const handleRegister = () => {
      // Dispatch the register action with user details
      // dispatch(registerUser({ username, email, password }));
  
      // Navigate to login screen or home after registration
      navigation.navigate('Main');
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
  
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
  
        <View style={styles.loginRedirect}>
          <Text style={styles.loginText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.loginLink}>Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
export default Login


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
  