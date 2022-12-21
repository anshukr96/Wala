import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { PublishPost } from '../../../api/feeds';
import { UploadMedia } from '../../../api/user';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import SecondaryButton from '../../../components/Button/SecondaryButton';
import PrimaryInput from '../../../components/Input';
import RadioButton from '../../../components/Radio/Radio';
import NormalText from '../../../components/Text/NormalText';
import { NETWORK_LISTING, OptionProps, USERID } from '../../../utils/constants';
import Snackbar from '../../../utils/Toast';
import { cameraOptions } from '../../MyProfile/EditProfile.screen';
import {
  default as CreateListingsStyles,
  default as CreateListingStyle,
} from './CreateListings.styles';

interface ListingInfoProps {
  heading: string;
  price: string;
  details: string;
  network: string;
  freeGiveAway: boolean;
}

export default function CreateListings({ navigation }: any) {
  const [listingInfo, setListingInfo] = useState<ListingInfoProps>({
    heading: '',
    price: '',
    details: '',
    network: '',
    freeGiveAway: false,
  });
  const [photoInfo, setPhotoInfo] = useState('');
  const [networkList, setNetworkList] = useState(NETWORK_LISTING);

  const updateDetails = (text: any, type: string) => {
    const details = { ...listingInfo, [type]: text };
    setListingInfo(details);
  };

  const onRadioBtnClick = (item: OptionProps) => {
    let updatedState = networkList.map(isSelectedItem =>
      isSelectedItem.id === item.id
        ? { ...isSelectedItem, selected: true }
        : { ...isSelectedItem, selected: false },
    );
    setNetworkList(updatedState);
  };

  const publishNewPost = async () => {
    const id = await AsyncStorage.getItem(USERID);
    const requestBody = {
      query: {
        _id: id,
      },
      payload: {
        title: '',
        networks: [],
        price: '',
        freeGiveAway: false,
        images: '',
        details: '',
        published: true,
      },
    };
    const data = PublishPost(id || '', requestBody);
    if (data) {
      console.log(data);
      Snackbar({
        type: 'success',
        message: 'Post is created successfully',
      });
    } else {
      Snackbar({
        type: 'error',
        message: 'unable to fetch network list',
        position: 'bottom',
      });
    }
  };

  const uploadPhoto = async () => {
    const { assets } = await launchCamera(cameraOptions);
    if (assets?.length) {
      let photo = {
        uri: assets[0].uri,
        type: assets[0].type,
        name: assets[0].fileName,
      };

      const { data } = await UploadMedia(photo);
      if (data) {
        setPhotoInfo(data);
      } else {
        Snackbar({
          type: 'error',
          message: 'Unable to upload image',
        });
      }
    }
  };

  const ListingsHeader = () => {
    return (
      <View>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back-outline'} size={30} color={'black'} />
        </Pressable>
      </View>
    );
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
              {networkList.map((item, index) => (
                <View key={index}>
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
            onPress={publishNewPost}
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

        <Pressable onPress={uploadPhoto}>
          {photoInfo !== '' ? (
            <Image
              source={{
                uri: photoInfo,
              }}
              style={{ width: 120, height: 120 }}
            />
          ) : (
            <Image
              source={require('../../../assets/images/upload.png')}
              style={{ width: 120, height: 120 }}
            />
          )}
        </Pressable>
        <NormalText>Upload Image</NormalText>
      </View>

      <View>
        <View>
          <PrimaryInput
            onChangeText={text => updateDetails(text, 'heading')}
            placeholder={'Heading'}
            value={listingInfo.heading}
          />
        </View>
        <View style={CreateListingsStyles.price}>
          <PrimaryInput
            onChangeText={text => updateDetails(text, 'price')}
            placeholder={'Price'}
            value={listingInfo.price}
            style={{ width: '30%' }}
          />
          <SecondaryButton
            title="Free giveaway!"
            onPress={() =>
              updateDetails(!listingInfo.freeGiveAway, 'freeGiveAway')
            }
            style={{ height: 40, marginRight: 12 }}
          />
        </View>
        <View>
          <PrimaryInput
            onChangeText={text => updateDetails(text, 'details')}
            placeholder={'Details'}
            value={listingInfo.details}
          />
        </View>
      </View>

      {renderNetworkPublish()}
    </View>
  );
}
