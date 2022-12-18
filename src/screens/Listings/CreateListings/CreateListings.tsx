import React, { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import SecondaryButton from '../../../components/Button/SecondaryButton';
import PrimaryInput from '../../../components/Input';
import RadioButton from '../../../components/Radio/Radio';
import NormalText from '../../../components/Text/NormalText';
import { NETWORK_LISTING, OptionProps } from '../../../utils/constants';
import {
  default as CreateListingsStyles,
  default as CreateListingStyle,
} from './CreateListings.styles';

interface ListingInfoProps {
  heading: string;
  price: string;
  details: string;
  network: string;
}

export default function CreateListings({ navigation }: any) {
  const [listingInfo, setListingInfo] = useState<ListingInfoProps>({
    heading: '',
    price: '',
    details: '',
    network: '',
  });

  const [networkList, setNetworkList] = useState(NETWORK_LISTING);

  const ListingsHeader = () => {
    return (
      <View>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back-outline'} size={30} color={'black'} />
        </Pressable>
      </View>
    );
  };

  const onRadioBtnClick = (item: OptionProps) => {
    let updatedState = networkList.map(isSelectedItem =>
      isSelectedItem.id === item.id
        ? { ...isSelectedItem, selected: true }
        : { ...isSelectedItem, selected: false },
    );
    setNetworkList(updatedState);
  };

  const renderNetworkPublish = () => {
    return (
      <View style={CreateListingStyle.chooseNetwork}>
        <View style={CreateListingStyle.chooseHeader}>
          <NormalText>Choose Networks:</NormalText>
          <Image
            source={require('../../../assets/images/add.png')}
            style={{ width: 24, height: 24 }}
          />
        </View>
        <ScrollView
          persistentScrollbar={true}
          showsVerticalScrollIndicator={true}>
          {networkList.length ? (
            <View style={CreateListingStyle.list}>
              {networkList.map(item => (
                <View key={item.id}>
                  <RadioButton
                    onPress={() => onRadioBtnClick(item)}
                    selected={item.selected}
                    key={item.id}>
                    {item.name}
                  </RadioButton>
                </View>
              ))}
            </View>
          ) : (
            <View style={{ marginVertical: 16 }}>
              <NormalText style={{ color: '#A0A0A0' }}>
                You are not a part of any network. Add a network now to Publish
                your post
              </NormalText>
            </View>
          )}
        </ScrollView>

        <View style={CreateListingStyle.cta}>
          {networkList.length && (
            <PrimaryButton
              title="PUBLISH"
              onPress={() => console.log('publish')}
            />
          )}

          <SecondaryButton
            title="SAVE WITHOUT PUBLISHING"
            onPress={() => console.log('publish')}
            style={CreateListingStyle.saveCTA}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={CreateListingStyle.container}>
      <ListingsHeader />

      <View style={CreateListingStyle.upload}>
        <NormalText style={{ fontSize: 24 }}>New listing</NormalText>

        <Image
          source={require('../../../assets/images/upload.png')}
          style={{ width: 120, height: 120 }}
        />
        <NormalText>Upload Image</NormalText>
      </View>

      <View>
        <View>
          <PrimaryInput
            onChangeText={() => console.log('dfs')}
            placeholder={'Heading'}
            value={listingInfo.heading}
          />
        </View>
        <View style={CreateListingsStyles.price}>
          <PrimaryInput
            onChangeText={() => console.log('dfs')}
            placeholder={'Price'}
            value={listingInfo.price}
            style={{ width: '30%' }}
          />
          <SecondaryButton
            title="Free giveaway!"
            onPress={() => console.log('press givewawy')}
            style={{ height: 40, marginRight: 12 }}
          />
        </View>
        <View>
          <PrimaryInput
            onChangeText={() => console.log('dfs')}
            placeholder={'Details'}
            value={listingInfo.details}
          />
        </View>
      </View>

      {renderNetworkPublish()}
    </View>
  );
}
