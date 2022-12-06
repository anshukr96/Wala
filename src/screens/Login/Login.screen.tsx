import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import PrimaryButton from '../../components/Button/PrimaryButton';
import PrimaryInput from '../../components/Input';
import {
  AuthContext,
  AuthContextInterface,
  RootStackParamList,
} from '../../navigation/navigation';

import styles from './Login.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [text, onChangeText] = useState('');
  const [isOTP, setIsOTP] = useState(false);
  const { signIn } = React.useContext(AuthContext) as AuthContextInterface;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wala</Text>

      <View style={styles.inputWrapper}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          {isOTP ? 'Enter OTP' : 'LOGIN'}
        </Text>

        <View style={styles.inputNote}>
          {!isOTP ? (
            <Text style={styles.text}>Please enter your phone number</Text>
          ) : (
            <Text style={styles.text}>We've sent an OTP on input phone</Text>
          )}

          <PrimaryInput
            onChangeText={onChangeText}
            placeholder={isOTP ? '10 digits...' : 'Enter 6 digit OTP'}
            value={text}
          />

          <View style={{ width: '94%', marginLeft: 12, marginVertical: 8 }}>
            <PrimaryButton
              title={isOTP ? 'VERIFY OTP' : 'SEND OTP'}
              onPress={() => {
                setIsOTP(true);
                signIn({ username: 'anshu', password: 'password' });
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.resendOTP}>
        <TouchableOpacity>
          <Text style={styles.incorrectOTP}>Incorrect OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.resend}>Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
