import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OutlineButton from '../components/Button/OutlineButton';
import PrimaryButton from '../components/Button/PrimaryButton';

interface NetworkModalProps {
  onNetworkAdded: () => void;
  onNavigateToHome: () => void;
}

export default function NetworkAddModal({
  onNetworkAdded,
  onNavigateToHome,
}: NetworkModalProps) {
  return (
    <View>
      <Text style={styles.header}>You've successfully added the network!</Text>

      <PrimaryButton title="ADD ANOTHER NETWORK" onPress={onNetworkAdded} />

      <View style={styles.outlineBtn}>
        <OutlineButton title="GO TO HOMESCREEN" onPress={onNavigateToHome} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outlineBtn: {
    marginTop: 14,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
  },
});
