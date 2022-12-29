import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GetPostsList } from '../../api/feeds';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SecondaryButton from '../../components/Button/SecondaryButton';
import Card from '../../components/Card/Card';
import { StackParamList } from '../../navigation/DrawerNavigation/FeedDrawerNavigation';
import Snackbar from '../../utils/Toast';
import FeedStyles from './Feed.style';

type Props = DrawerScreenProps<StackParamList, 'My Listing'>;

interface FeedHeaderProps {
  onMenuToggle: () => void;
  onPress: () => void;
}

const Feed = ({ navigation }: Props) => {
  const [feedList, setFeedList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostList();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPostList();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchPostList = async () => {
    const { data } = await GetPostsList();
    if (data) {
      setFeedList(data);
      setLoading(false);
    } else {
      Snackbar({
        type: 'error',
        message: 'unable to fetch network list',
        position: 'bottom',
      });
      setLoading(false);
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

  const renderPosts = () => {
    if (feedList.length) {
      return (
        <ScrollView
          contentContainerStyle={FeedStyles.scrollContainer}
          persistentScrollbar={true}
          showsVerticalScrollIndicator={true}>
          <View>
            {feedList.map((post, index) => {
              return (
                <View key={index}>
                  <Card posts={post} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      );
    }
  };

  if (loading) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
      <FeedHeader
        onMenuToggle={() => navigation.toggleDrawer()}
        onPress={() => navigation.navigate('ExistingListing')}
      />
      {feedList.length ? renderPosts() : renderNoNetwork()}
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
