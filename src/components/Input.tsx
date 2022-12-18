import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface PrimaryInputProps {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  maxLength?: number;
  style?: Record<string, string | number>;
}

export default function PrimaryInput({
  value,
  onChangeText,
  placeholder,
  maxLength,
  style,
}: PrimaryInputProps) {
  return (
    <TextInput
      style={style ? { ...styles.input, ...style } : { ...styles.input }}
      onChangeText={onChangeText}
      placeholder={placeholder || ''}
      value={value}
      maxLength={maxLength}
      placeholderTextColor="#454545"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    color: 'black',
    backgroundColor: '#dadce0',
  },
});
