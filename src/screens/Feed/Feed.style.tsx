import { StatusBar, StyleSheet } from 'react-native';

const FeedStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 300,
  },
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
    marginHorizontal: 16,
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
