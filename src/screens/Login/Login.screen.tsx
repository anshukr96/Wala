import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { sendOTP, verifyOTP } from '../../api/auth';
import PrimaryButton from '../../components/Button/PrimaryButton';
import PrimaryInput from '../../components/Input';
import {
  AuthContext,
  AuthContextInterface,
  RootStackParamList,
} from '../../navigation/navigation';
import Snackbar from '../../utils/Toast';

import styles from './Login.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [isOTP, setIsOTP] = useState(false);
  const { signIn } = React.useContext(AuthContext) as AuthContextInterface;

  const sendPhoneOTP = async () => {
    if (phoneNumber.length !== 10) {
      Snackbar({
        type: 'error',
        message: 'Please enter a valid phone number',
      });
      return;
    }
    const { data, error } = await sendOTP({ phoneNumber: `+91${phoneNumber}` });

    if (data) {
      setIsOTP(true);
      Snackbar({
        type: 'success',
        message: `Please enter the OTP sent to ${phoneNumber}`,
        position: 'bottom',
      });
    } else {
      Snackbar({
        type: 'error',
        message: error,
        position: 'bottom',
      });
    }
  };

  const getButtonColor = () => {
    if (!isOTP) {
      return phoneNumber.length < 10 ? '#D3D3D3' : '#088F8F';
    }
    return otp.length < 4 ? '#D3D3D3' : '#088F8F';
  };

  const verifyPhoneOTP = async () => {
    if (!otp.length) {
      Snackbar({
        type: 'error',
        message: `Please enter the OTP sent to ${phoneNumber}`,
        position: 'bottom',
      });
      return;
    }

    const body = {
      phoneNumber: `+91${phoneNumber}`,
      otp: otp,
    };
    const { data, error } = await verifyOTP(body);
    if (data) {
      signIn(data);
    } else {
      Snackbar({ type: 'error', message: 'Incorrect OTP', position: 'bottom' });
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
            <Text style={styles.text}>
              Please enter the OTP sent to ${phoneNumber}
            </Text>
          )}

          <PrimaryInput
            onChangeText={isOTP ? setOTP : setPhoneNumber}
            placeholder={!isOTP ? '10 digits...' : 'Enter 4 digit OTP'}
            value={!isOTP ? phoneNumber : otp}
            maxLength={isOTP ? 4 : 10}
            keyboardType="number-pad"
          />

          <View style={{ width: '94%', marginLeft: 12, marginVertical: 8 }}>
            <PrimaryButton
              title={isOTP ? 'VERIFY OTP' : 'SEND OTP'}
              onPress={isOTP ? verifyPhoneOTP : sendPhoneOTP}
              disabled={!isOTP && phoneNumber.length < 10}
              style={{ backgroundColor: getButtonColor() }}
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
