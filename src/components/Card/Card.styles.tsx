import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    padding: 8,
    margin: 16,
  },
  share: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
  },
  text: {
    marginRight: 16,
  },
  img: {
    alignItems: 'center',
    marginRight: 8,
  },
  edit: {
    color: 'green',
  },
  info: {
    marginTop: 16,
  },
  details: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  detailText: {
    fontSize: 14,
    marginRight: 4,
  },
  dropdownPosition: {
    position: 'absolute',
    right: 12,
    top: 32,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    zIndex: 10,
    padding: 16,
    width: 220,
    borderRadius: 8,
  },
  dropdownCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
});
