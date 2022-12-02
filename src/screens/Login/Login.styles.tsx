import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SafeAreaView1: { flex: 0 },
  SafeAreaView2: { flex: 1 },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    color: 'green',
  },
  inputWrapper: {
    width: '100%',
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputNote: {
    marginTop: 48,
    width: '90%',
  },
  text: {
    marginLeft: 12,
  },
  resendOTP: {
    width: '80%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  resend: {
    color: '#0000FF',
  },
  incorrectOTP: {
    color: 'red',
  },
});
