import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface PrimaryInputProps {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  maxLength?: number;
}

export default function PrimaryInput({
  value,
  onChangeText,
  placeholder,
  maxLength,
}: PrimaryInputProps) {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      placeholder={placeholder || ''}
      value={value}
      maxLength={maxLength}
      placeholderTextColor="#D3D3D3"
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
  },
});
