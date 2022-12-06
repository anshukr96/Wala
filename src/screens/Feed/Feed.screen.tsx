import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StatusBar, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SecondaryButton from '../../components/Button/SecondaryButton';
import { DrawerParamList } from '../../navigation/DrawerNavigation/FeedDrawerNavigation';
import commonStyles from '../common.styles';
import FeedStyles from './Feed.style';

type Props = DrawerScreenProps<DrawerParamList, 'Feed'>;

const Feed = ({ navigation }: Props) => {
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
            onPress={() => navigation.navigate('AddNetwork')}
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
        {feedList.length ? <></> : renderNoNetwork()}
      </SafeAreaView>
    </>
  );
};

export const FeedHeader = () => {
  return (
    <View style={FeedStyles.outerWrapper}>
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
  );
};

export default Feed;
