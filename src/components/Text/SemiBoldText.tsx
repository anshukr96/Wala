import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SemiBoldTextProps {
  children: JSX.Element;
  style?: Record<string, string>;
}

export default function SemiBoldText({ children, style }: SemiBoldTextProps) {
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
    fontFamily: 'Lexend-SemiBold',
    fontSize: 16,
  },
});
