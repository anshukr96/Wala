import { StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 32,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 300,
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  input: {
    borderRadius: 12,
    borderBottomColor: '#000000',
    borderWidth: 1,
    padding: 10,
    height: 120,
  },
  options: {
    marginVertical: 16,
  },
  cta: {
    marginVertical: 32,
    width: '50%',
    alignSelf: 'center',
  },
});
