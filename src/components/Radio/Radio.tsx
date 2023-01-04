import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RadioProps {
  onPress: () => void;
  selected: boolean;
  children: JSX.Element | string;
  key: number | string;
}

const RadioButton = ({ onPress, selected, children, key }: RadioProps) => {
  return (
    <View style={styles.radioButtonContainer} key={key}>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#98CFB6',
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
});
