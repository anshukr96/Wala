import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { sendOTP, verifyOTP } from '../../api/auth';
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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [isOTP, setIsOTP] = useState(false);
  const { signIn } = React.useContext(AuthContext) as AuthContextInterface;

  const sendPhoneOTP = async () => {
    const isOTPSend = await sendOTP({ phoneNumber: `+91${phoneNumber}` });
    if (isOTPSend) {
      setIsOTP(true);
      Toast.show({
        type: 'success',
        text1: `Please enter the OTP sent to ${phoneNumber}`,
        position: 'bottom',
      });
    }
  };

  const verifyPhoneOTP = async () => {
    if (!otp.length) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please enter the OTP sent to mobile number',
      });
      return;
    }

    const body = {
      phoneNumber: `+91${phoneNumber}`,
      otp: otp,
    };
    const { data, error } = await verifyOTP(body);
    if (data) {
      signIn({ token: data.token });
    } else {
      Toast.show({
        type: 'error',
        text1: error,
        position: 'bottom',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wala</Text>

      <View style={styles.inputWrapper}>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'black',
            fontFamily: 'Lexend-Bold',
          }}>
          {isOTP ? 'Enter OTP' : 'LOGIN'}
        </Text>

        <View style={styles.inputNote}>
          {!isOTP ? (
            <Text style={styles.text}>Please enter your phone number</Text>
          ) : (
            <Text style={styles.text}>We've sent an OTP on input phone</Text>
          )}

          <PrimaryInput
            onChangeText={isOTP ? setOTP : setPhoneNumber}
            placeholder={!isOTP ? '10 digits...' : 'Enter 4 digit OTP'}
            value={!isOTP ? phoneNumber : otp}
            maxLength={isOTP ? 4 : 10}
          />

          <View style={{ width: '94%', marginLeft: 12, marginVertical: 8 }}>
            <PrimaryButton
              title={isOTP ? 'VERIFY OTP' : 'SEND OTP'}
              onPress={isOTP ? verifyPhoneOTP : sendPhoneOTP}
            />
          </View>
        </View>
      </View>

      {isOTP && (
        <View style={styles.resendOTP}>
          <TouchableOpacity onPress={() => setIsOTP(false)}>
            <Text style={styles.incorrectOTP}>Change Phone Number</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setOTP('');
              sendPhoneOTP();
            }}>
            <Text style={styles.resend}>Resend</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
