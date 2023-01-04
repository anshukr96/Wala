import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface OutlineButtonProps {
  title: string;
  onPress: () => void;
  style?: Record<string, string>;
}

export default function OutlineButton({
  title,
  onPress,
  style,
}: OutlineButtonProps) {
  return (
    <Pressable
      style={style ? { ...styles.button, ...style } : { ...styles.button }}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingHorizontal: 16,
    borderColor: '#088F8F',
    borderWidth: 1,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#088F8F',
  },
});
