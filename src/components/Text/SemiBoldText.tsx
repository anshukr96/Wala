import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SemiBoldTextProps {
  children: JSX.Element;
}

export default function SemiBoldText({ children }: SemiBoldTextProps) {
  return (
    <View>
      <Text style={TextStyles.container}>{children}</Text>;
    </View>
  );
}

export const TextStyles = StyleSheet.create({
  container: {
    fontFamily: 'Lexend-SemiBold',
    fontSize: 16,
  },
});
