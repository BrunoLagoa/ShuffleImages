import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

Icon.loadFont();

export default function Tab({ icon, isSelected }) {
  return (
    <View style={styles.container}>
      <Icon name={icon} color={isSelected ? 'black' : 'grey'} size={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
