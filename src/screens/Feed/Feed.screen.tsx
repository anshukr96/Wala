import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StatusBar, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GetPostsList } from '../../api/feeds';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SecondaryButton from '../../components/Button/SecondaryButton';
import { StackParamList } from '../../navigation/DrawerNavigation/FeedDrawerNavigation';
import Snackbar from '../../utils/Toast';
import commonStyles from '../common.styles';
import FeedStyles from './Feed.style';

type Props = DrawerScreenProps<StackParamList, 'Listing'>;

interface FeedHeaderProps {
  onMenuToggle: () => void;
  onPress: () => void;
}

const Feed = ({ navigation }: Props) => {
  const [feedList, setFeedList] = useState([]);

  useEffect(() => {
    fetchPostList();
  }, []);

  const fetchPostList = async () => {
    const { data } = await GetPostsList();
    if (data) {
      setFeedList(data);
    } else {
      Snackbar({
        type: 'error',
        message: 'unable to fetch network list',
        position: 'bottom',
      });
    }
  };

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
        <FeedHeader
          onMenuToggle={() => navigation.toggleDrawer()}
          onPress={() => navigation.navigate('ExistingListing')}
        />
        {feedList.length ? <></> : renderNoNetwork()}
      </SafeAreaView>
    </>
  );
};

export const FeedHeader = ({ onMenuToggle, onPress }: FeedHeaderProps) => {
  return (
    <View style={FeedStyles.outerWrapper}>
      <Pressable onPress={onMenuToggle}>
        <Icon name={'ios-menu'} size={24} color={'black'} />
      </Pressable>
      <View style={FeedStyles.ctaWrapper}>
        <SecondaryButton title="New listing" onPress={onPress} />

        <View style={FeedStyles.searchWrapper}>
          <Icon name={'ios-search'} size={24} color={'black'} />
        </View>
      </View>
    </View>
  );
};

export default Feed;
