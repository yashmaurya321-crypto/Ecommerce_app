// components/Setting.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/themeSlice';
import { lightTheme, darkTheme } from '../themes';

const Setting = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={{ color: theme.color }}>Theme</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#ccc' }]}
        onPress={() => dispatch(toggleTheme())}
      >
        <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
});

export default Setting;
