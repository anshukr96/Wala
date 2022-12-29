import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 32,
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 24,
  },
  profile: {
    alignItems: 'stretch',
  },
  info: {
    width: 150,
    justifyContent: 'flex-start',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 12,
  },
  upload: {
    alignSelf: 'center',
  },
  list: {
    marginTop: 32,
  },
  listname: {
    fontSize: 14,
  },
  cta: {
    marginVertical: 32,
    alignItems: 'center',
  },
  block: {
    minWidth: 128,
    marginRight: 64,
  },
  button: {
    width: '64%',
  },
  edit: {
    color: '#65a765',
    fontSize: 18,
  },
});
