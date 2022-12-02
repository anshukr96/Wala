import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PrimaryButton from '../../components/Button';
import PrimaryInput from '../../components/Input';
import styles from './Login.styles';

export default function Login() {
  const [text, onChangeText] = useState('');
  const [isOTP, setIsOTP] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.SafeAreaView1} />
      <SafeAreaView style={styles.SafeAreaView2} />

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
              onPress={() => setIsOTP(otp => !otp)}
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
