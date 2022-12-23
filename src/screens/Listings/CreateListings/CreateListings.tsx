import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { CreatePost } from '../../../api/feeds';
import { GetNetworkList } from '../../../api/network';
import { UploadMedia } from '../../../api/user';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import SecondaryButton from '../../../components/Button/SecondaryButton';
import PrimaryInput from '../../../components/Input';
import RadioButton from '../../../components/Radio/Radio';
import NormalText from '../../../components/Text/NormalText';
import { CreatePostBody } from '../../../types/feed/feed';
import { OptionProps } from '../../../utils/constants';
import Snackbar from '../../../utils/Toast';
import {
  default as CreateListingsStyles,
  default as CreateListingStyle,
} from './CreateListings.styles';

interface ListingInfoProps {
  heading: string;
  price: string;
  details: string;
  network: string[];
  freeGiveAway: boolean;
}
export declare type MediaType = 'photo' | 'video' | 'mixed';
export declare type PhotoQuality =
  | 0
  | 0.1
  | 0.2
  | 0.3
  | 0.4
  | 0.5
  | 0.6
  | 0.7
  | 0.8
  | 0.9
  | 1;

export default function CreateListings({ navigation }: any) {
  const [listingInfo, setListingInfo] = useState<ListingInfoProps>({
    heading: '',
    price: '',
    details: '',
    network: [''],
    freeGiveAway: false,
  });
  const [photoInfo, setPhotoInfo] = useState('');
  const [networkList, setNetworkList] = useState([
    {
      _id: '',
      name: '',
      type: '',
      selected: false,
    },
  ]);

  useEffect(() => {
    getNetowrkDetails();
  }, []);

  const getNetowrkDetails = async () => {
    const { data } = await GetNetworkList();
    if (data) {
      let list: any = [];
      data.map((network: any) => {
        list.push({ ...network, selected: false });
      });
      setNetworkList(list);
    } else {
      Snackbar({
        type: 'error',
        message: 'Unable to get Netowrk details',
      });
    }
  };

  const updateDetails = (text: any, type: string) => {
    const details = { ...listingInfo, [type]: text };
    setListingInfo(details);
  };

  const onRadioBtnClick = (item: OptionProps) => {
    let listInfo = { ...listingInfo };
    let updatedState = networkList.map(isSelectedItem =>
      isSelectedItem._id === item._id
        ? { ...isSelectedItem, selected: true }
        : { ...isSelectedItem, selected: false },
    );
    setNetworkList(updatedState);
    listInfo = { ...listInfo, network: [item._id] };
    setListingInfo(listInfo);
  };

  const publishNewPost = async (isPublish = false) => {
    if (!listingInfo.network.length) {
      Snackbar({
        type: 'error',
        message: 'choose network where you want to show  ',
        message2: 'your post',
      });
      return;
    }
    const requestBody: CreatePostBody = {
      title: listingInfo.heading,
      networks: listingInfo.network,
      price: listingInfo.price,
      freeGiveAway: listingInfo.freeGiveAway,
      images: [
        'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__480.jpg',
      ],
      details: listingInfo.details,
      published: true,
    };
    !isPublish ? delete requestBody?.published : null;

    const data = await CreatePost(requestBody);
    if (data) {
      Snackbar({
        type: 'success',
        message: 'Post is created successfully',
      });
      navigation.navigate('Listing');
    } else {
      Snackbar({
        type: 'error',
        message: 'unable to fetch network list',
        position: 'bottom',
      });
    }
  };

  const uploadPhoto = async () => {
    const cameraOptions = {
      maxWidth: 250,
      maxHeight: 250,
      quality: 0.7 as PhotoQuality,
      mediaType: 'photo' as MediaType,
    };
    const { assets } = await launchCamera(cameraOptions);
    if (assets?.length) {
      const { data } = await UploadMedia(assets[0]);
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
                    key={item._id}>
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
              onPress={() => publishNewPost(true)}
            />
          )}

          <SecondaryButton
            title="SAVE WITHOUT PUBLISHING"
            onPress={() => publishNewPost(false)}
            style={CreateListingStyle.saveCTA}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={CreateListingStyle.scrollContainer}>
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
              style={{
                height: 40,
                marginRight: 12,
                backgroundColor: listingInfo.freeGiveAway ? '#65a765' : 'gray',
              }}
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
    </ScrollView>
  );
}
