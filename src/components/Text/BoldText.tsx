import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BoldTextProps {
  children: JSX.Element | string;
  style?: Record<string, string | number>;
}

export default function BoldText({ children, style }: BoldTextProps) {
  return (
    <View>
      <Text
        style={
          style
            ? { ...TextStyles.container, ...style }
            : { ...TextStyles.container }
        }>
        {children}
      </Text>
    </View>
  );
}

export const TextStyles = StyleSheet.create({
  container: {
    fontFamily: 'Lexend-Bold',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
