import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardLayout = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.20,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 7,
    backgroundColor: 'white',
  }
});

export default CardLayout;