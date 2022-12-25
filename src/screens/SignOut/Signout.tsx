import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SignOut } from '../../api/auth';
import OutlineButton from '../../components/Button/OutlineButton';
import SecondaryButton from '../../components/Button/SecondaryButton';
import Snackbar from '../../utils/Toast';

export default function Signout({ navigation }: any) {
  const onSignout = async () => {
    const { data } = await SignOut();

    if (data) {
      Snackbar({
        type: 'success',
        message: 'User sign out successfully',
      });
      navigation.navigate('Listing');
    } else {
      Snackbar({
        type: 'error',
        message: 'Unable to sign out',
      });
    }
  };

  const goBack = () => {
    navigation.navigate('Listing');
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>
        Are you sure want to sign out of the app?
      </Text>

      <View style={styles.outlineBtn}>
        <View style={styles.cta}>
          <OutlineButton title="Yes" onPress={onSignout} />
        </View>

        <View style={styles.cta}>
          <SecondaryButton title="Cancel" onPress={goBack} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cta: {
    marginVertical: 32,
    marginHorizontal: 24,
  },
});
