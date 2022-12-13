import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface NormalTextProps {
  children: JSX.Element;
}

export default function NormalText({ children }: NormalTextProps) {
  return (
    <View>
      <Text style={TextStyles.container}>{children}</Text>;
    </View>
  );
}

export const TextStyles = StyleSheet.create({
  container: {
    fontFamily: 'Lexend-Regular',
    fontSize: 16,
  },
});
