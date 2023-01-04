import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: '#D3D3D3',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 20,
    shadowColor: '#90EE90',
    padding: 8,
    margin: 12,
  },
  container: {
    flexDirection: 'row',
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
  detailsText: {
    marginTop: 16,
    fontSize: 14,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    width: 250,
    borderRadius: 8,
    elevation: 60,
    shadowColor: '#FF0000',
  },
  dropdownCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
});
