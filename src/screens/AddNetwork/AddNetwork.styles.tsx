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
    color: 'black',
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
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 12,
    textAlignVertical: 'center',
  },
  pickerContainer: {
    width: '100%',
    height: 50,
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
  netWarningText: {
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: '#454545',
  },
});
