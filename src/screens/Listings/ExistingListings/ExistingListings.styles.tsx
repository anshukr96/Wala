import { StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 300,
  },
  container: {
    margin: 32,
  },
  newlist: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#dadce0',
    width: '80%',
  },
  header: {
    margin: 16,
    marginTop: 32,
  },
});
