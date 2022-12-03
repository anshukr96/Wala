import React, { useState } from 'react';
import { Alert, SafeAreaView, StatusBar, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SecondaryButton from '../../components/Button/SecondaryButton';
import commonStyles from '../common.styles';
import FeedStyles from './Feed.style';

const Feed = () => {
  const [feedList, setFeedList] = useState([]);

  const renderNoNetwork = () => {
    return (
      <View style={FeedStyles.noNetworkWrapper}>
        <View>
          <Text style={FeedStyles.noNetworkText}>
            You are not a part of any network. Add a network now to view
            associated network listings.
          </Text>
        </View>

        <View style={FeedStyles.addNetwork}>
          <PrimaryButton
            title="ADD NETWORK"
            style={FeedStyles.addNetworkButton}
            onPress={() => Alert.alert('add netowrk')}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
      <SafeAreaView style={commonStyles.SafeAreaView1} />
      <SafeAreaView style={commonStyles.SafeAreaView2}>
        <View style={FeedStyles.outerWrapper}>
          <View>
            <Icon name={'ios-menu'} size={32} color={'black'} />
          </View>

          <View style={FeedStyles.ctaWrapper}>
            <SecondaryButton
              title="New listing"
              onPress={() => Alert.alert('great job')}
            />

            <View style={FeedStyles.searchWrapper}>
              <Icon name={'ios-search'} size={24} color={'black'} />
            </View>
          </View>
        </View>

        {feedList.length ? <></> : renderNoNetwork()}
      </SafeAreaView>
    </>
  );
};

export default Feed;
