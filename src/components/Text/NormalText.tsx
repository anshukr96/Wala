import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface NormalTextProps {
  children: JSX.Element;
  style?: Record<string, string>;
}

export default function NormalText({ children, style }: NormalTextProps) {
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
    fontFamily: 'Lexend-Regular',
    fontSize: 16,
  },
});
