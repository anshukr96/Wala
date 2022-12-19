import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Image, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GetExistingPosts } from '../../../api/feeds';
import Card from '../../../components/Card/Card';
import NormalText from '../../../components/Text/NormalText';
import SemiBoldText from '../../../components/Text/SemiBoldText';
import { TOKEN } from '../../../utils/constants';
import Snackbar from '../../../utils/Toast';
import ExisitngListingsStyles from './ExistingListings.styles';

export default function ExistingListings({ navigation }: any) {
  useEffect(() => {
    fetchExistingsPost();
  }, []);

  const fetchExistingsPost = async () => {
    const user = await AsyncStorage.getItem(TOKEN);
    const { data, err } = await GetExistingPosts('');
    if (data) {
      console.log(data);
    } else {
      Snackbar({
        type: 'error',
        message: err,
      });
    }
  };

  const ListingsHeader = () => {
    return (
      <View>
        <Pressable onPress={() => navigation.goBack()} style={{ margin: 16 }}>
          <Icon name={'arrow-back-outline'} size={30} color={'black'} />
        </Pressable>
      </View>
    );
  };

  return (
    <View>
      <ListingsHeader />

      <Pressable onPress={() => navigation.navigate('CreateListings')}>
        <View style={ExisitngListingsStyles.newlist}>
          <Image
            source={require('../../../assets/images/add.png')}
            style={{ width: 32, height: 32, marginRight: 16 }}
          />

          <SemiBoldText>New listing</SemiBoldText>
        </View>
      </Pressable>

      <View style={ExisitngListingsStyles.header}>
        <NormalText>Existing posts</NormalText>
      </View>

      <View>
        <Card />
      </View>
    </View>
  );
}
