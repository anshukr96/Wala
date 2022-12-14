import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OutlineButton from '../components/Button/OutlineButton';
import SecondaryButton from '../components/Button/SecondaryButton';

interface DeleteNetworkModalProps {
  onDelete: () => void;
  cancelDelete: () => void;
}

export default function DeleteNetworkModal({
  onDelete,
  cancelDelete,
}: DeleteNetworkModalProps) {
  return (
    <View>
      <Text style={styles.header}>
        You will have to re-verify to add the network again
      </Text>

      <Text style={styles.header}>
        Are you sure you want to delete the network?
      </Text>

      <View style={styles.outlineBtn}>
        <View style={styles.cta}>
          <OutlineButton title="Yes" onPress={onDelete} />
        </View>

        <View style={styles.cta}>
          <SecondaryButton title="Cancel" onPress={cancelDelete} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outlineBtn: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cta: {
    width: '40%',
    cursor: 'pointer',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
    color: 'black',
  },
});
