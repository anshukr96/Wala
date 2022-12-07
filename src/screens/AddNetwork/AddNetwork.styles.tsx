import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 16 },
  codeFieldRoot: { marginTop: 20, justifyContent: 'center' },
  cell: {
    width: 36,
    height: 36,
    lineHeight: 38,
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  focusCell: {
    borderColor: '#000',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  submitCTA: {
    width: '30%',
    alignSelf: 'flex-end',
    marginRight: 40,
    marginVertical: 15,
  },
  pickerContainer: {
    width: '100%',
    height: 40,
    color: '#344953',
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'green',
  },
  netWarning: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    maxWidth: '60%',
    alignSelf: 'center',
    backgroundColor: '#D3D3D3',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#454545',
  },
});
