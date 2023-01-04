import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OutlineButton from '../components/Button/OutlineButton';
import PrimaryButton from '../components/Button/PrimaryButton';

interface NetworkModalProps {
  onNetworkAdded: () => void;
  onNavigateToHome: () => void;
}

export default function NoNetworkPopup({
  onNetworkAdded,
  onNavigateToHome,
}: NetworkModalProps) {
  return (
    <View>
      <Text style={styles.header}>
        You will not see any posts until you add a network. You can later manage
        networks from your profile page
      </Text>

      <PrimaryButton title="ADD NETWORK" onPress={onNetworkAdded} />

      <View style={styles.outlineBtn}>
        <OutlineButton
          title="CONTINUE WITHOUT ADDING NETWORK"
          onPress={onNavigateToHome}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outlineBtn: {
    marginTop: 14,
    alignSelf: 'center',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
    color: 'black',
  },
});
