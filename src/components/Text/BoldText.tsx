import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BoldTextProps {
  children: JSX.Element;
}

export default function BoldText({ children }: BoldTextProps) {
  return (
    <View>
      <Text style={TextStyles.container}>{children}</Text>;
    </View>
  );
}

export const TextStyles = StyleSheet.create({
  container: {
    fontFamily: 'Lexend-Bold',
    fontSize: 16,
  },
});
