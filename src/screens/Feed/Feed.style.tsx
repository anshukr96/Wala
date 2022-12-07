import { StyleSheet } from 'react-native';

const FeedStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  outerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  ctaWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchWrapper: {
    marginLeft: 12,
  },
  addNetwork: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    width: '80%',
  },
  addNetworkButton: {
    width: '70%',
  },
  noNetworkText: {
    fontSize: 18,
    color: '#454545',
    maxWidth: '80%',
  },
  noNetworkWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedStyles;
