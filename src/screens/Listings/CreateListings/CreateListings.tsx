import React from 'react';
import { Image, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../../../components/Card/Card';
import SemiBoldText from '../../../components/Text/SemiBoldText';
import CreateListingsStyles from './CreateListings.styles';

export default function CreateListings({ navigation }: any) {
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

      <Pressable onPress={() => console.log('new listing')}>
        <View style={CreateListingsStyles.newlist}>
          <Image
            source={require('../../../assets/images/add.png')}
            style={{ width: 32, height: 32, marginRight: 16 }}
          />

          <SemiBoldText>New listing</SemiBoldText>
        </View>
      </Pressable>

      <View>
        <Card />
      </View>
    </View>
  );
}
