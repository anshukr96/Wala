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
import PrimaryInput from '../../components/Input';
import BoldText from '../../components/Text/BoldText';
import { sortbyCreateDate } from '../../helpers/sort';
import { useDebounce } from '../../hooks/useDebounce';
import { StackParamList } from '../../navigation/DrawerNavigation/FeedDrawerNavigation';
import Snackbar from '../../utils/Toast';
import FeedStyles from './Feed.style';

type Props = DrawerScreenProps<StackParamList, 'Feeds'>;

interface FeedHeaderProps {
  isSort: boolean;
  onMenuToggle: () => void;
  onPress: () => void;
  onSort: () => void;
  onSearch: (text: string) => void;
}

const Feed = ({ navigation }: Props) => {
  const [feedList, setFeedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [isSort, setIsSort] = useState(false);

  useEffect(() => {
    fetchPostList();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPostList();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchPostList = async (text = '') => {
    const { data } = await GetPostsList(text);
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

  const onSort = () => {
    const sortType = !isSort ? 'asc' : 'desc';
    const sortedFeeds = sortbyCreateDate(feedList, sortType);
    setFeedList(sortedFeeds);
    setIsSort(sort => !sort);
  };

  const onPostSearch = (searchText: string) => {
    fetchPostList(searchText);
    searchText === '' ? setIsSearch(false) : setIsSearch(true);
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

  const renderNoSearch = () => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <BoldText>Sorry, no matches found"</BoldText>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
      <FeedHeader
        onMenuToggle={() => navigation.toggleDrawer()}
        onPress={() => navigation.navigate('My Listing')}
        onSearch={(text: string) => onPostSearch(text)}
        onSort={onSort}
        isSort={isSort}
      />
      {!feedList.length && isSearch
        ? renderNoSearch()
        : feedList.length
        ? renderPosts()
        : renderNoNetwork()}
    </>
  );
};

export const FeedHeader = ({
  onMenuToggle,
  onPress,
  onSearch,
  onSort,
  isSort,
}: FeedHeaderProps) => {
  const [toShowSearchInput, settoShowSearchInput] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const searchQuery = useDebounce(searchVal, 500);

  useEffect(() => {
    onSearch(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <View style={FeedStyles.outerWrapper}>
      <Pressable onPress={onMenuToggle}>
        <Icon name={'ios-menu'} size={24} color={'black'} />
      </Pressable>
      <View style={FeedStyles.ctaWrapper}>
        <SecondaryButton title="New listing" onPress={onPress} />

        {toShowSearchInput && (
          <PrimaryInput
            onChangeText={text => setSearchVal(text)}
            placeholder={'search posts by name'}
            value={searchVal}
            style={{ width: 160 }}
          />
        )}

        <Pressable
          style={FeedStyles.searchWrapper}
          onPress={() => settoShowSearchInput(input => !input)}>
          <Icon name={'ios-search'} size={24} color={'black'} />
        </Pressable>

        <Pressable style={{ marginHorizontal: 8 }} onPress={onSort}>
          <Icon
            name={isSort ? 'ios-funnel' : 'ios-funnel-outline'}
            size={24}
            color={'black'}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Feed;
