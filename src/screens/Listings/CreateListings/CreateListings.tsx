import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { CreatePost, UpdatePost } from '../../../api/feeds';
import { GetNetworkList } from '../../../api/network';
import { UploadMedia } from '../../../api/user';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import SecondaryButton from '../../../components/Button/SecondaryButton';
import CheckboxButton from '../../../components/checkbox/Checkbox';
import PrimaryInput from '../../../components/Input';
import NormalText from '../../../components/Text/NormalText';
import { OptionProps } from '../../../utils/constants';
import Snackbar from '../../../utils/Toast';
import { cameraOptions } from '../../MyProfile/EditProfile.screen';
import {
  default as CreateListingsStyles,
  default as CreateListingStyle,
} from './CreateListings.styles';

interface ListingInfoProps {
  heading: string;
  price: string;
  details?: string;
  networks: any[];
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

export default function CreateListings({ navigation, route }: any) {
  const { listDetails } = route.params;

  const [listingInfo, setListingInfo] = useState<ListingInfoProps>({
    heading: '',
    price: '',
    details: '',
    networks: [''],
    freeGiveAway: false,
  });
  const [photoInfo, setPhotoInfo] = useState<string[]>([]);
  const [networkList, setNetworkList] = useState([
    {
      _id: '',
      name: '',
      type: '',
      selected: false,
    },
  ]);

  useEffect(() => {
    getNetworkDetails();
    listDetails && Object.keys(listDetails).length ? populateInfo() : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateNetworkDetails = (listInfo: any) => {
    if (Object.keys(listDetails).length) {
      const dummyList = [...listInfo];
      dummyList.map(list => {
        if (
          listDetails.networks.filter(
            (network: any) => network._id === list._id,
          ).length
        ) {
          list.selected = true;
        }
      });
      setNetworkList(dummyList);
    }
  };

  const populateInfo = () => {
    let details = {
      heading: listDetails.title,
      price: listDetails.price.toString(),
      details: listDetails?.details || '',
      networks: listDetails.networks,
      freeGiveAway: listDetails.freeGiveAway,
    };
    setListingInfo(details);
    setPhotoInfo(listDetails.images);
  };

  const getNetworkDetails = async () => {
    const { data } = await GetNetworkList();
    if (data) {
      let list: any = [];
      data.map((network: any) => {
        list.push({ ...network, selected: false });
      });
      setNetworkList(list);
      updateNetworkDetails(list);
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
        ? { ...isSelectedItem, selected: !isSelectedItem.selected }
        : { ...isSelectedItem, selected: isSelectedItem.selected },
    );
    setNetworkList(updatedState);
    const allNetworks = updatedState
      .filter(network => network.selected)
      .map(list => list._id);

    listInfo = { ...listInfo, networks: allNetworks };
    setListingInfo(listInfo);
  };

  const createRequestBody = (isUpdatePost: boolean) => {
    const networks = [...networkList];
    const body = isUpdatePost
      ? {
          query: {
            _id: listDetails._id,
          },
          payload: {
            title: listingInfo.heading,
            networks: networks
              .filter(network => network.selected)
              .map(list => list._id),
            price: listingInfo.price,
            freeGiveAway: listingInfo.freeGiveAway,
            images: photoInfo,
            details: listingInfo.details,
            published: true,
          },
        }
      : {
          title: listingInfo.heading,
          networks: networks
            .filter(network => network.selected)
            .map(list => list._id),
          price: listingInfo.price,
          freeGiveAway: listingInfo.freeGiveAway,
          images: photoInfo,
          details: listingInfo.details,
          published: true,
        };

    if (listingInfo.freeGiveAway) {
      delete body.price;
    }
    if (!photoInfo.length) {
      delete body.images;
    }

    if (listingInfo.details === '') {
      delete body.details;
    }

    if (body?.payload?.details === '') {
      delete body?.payload?.details;
    }

    return body;
  };

  const publishNewPost = async (isPublish = false) => {
    if (!listingInfo.networks.length && isPublish) {
      Snackbar({
        type: 'error',
        message: 'choose network where you want to show your post',
      });
      return;
    }

    let requestBody = listDetails
      ? createRequestBody(true)
      : createRequestBody(false);

    if (!isPublish) {
      delete requestBody.networks;
    }

    !isPublish ? delete requestBody?.published : null;

    const request = listDetails
      ? UpdatePost(requestBody)
      : CreatePost(requestBody);

    const { data, err } = await request;

    if (data) {
      Snackbar({
        type: 'success',
        message: 'Post is created successfully',
      });
      navigation.navigate('Feeds');
    } else {
      Snackbar({
        type: 'error',
        message: err,
        position: 'bottom',
      });
    }
  };

  const uploadPhoto = async () => {
    const { assets } = await launchCamera(cameraOptions);
    if (assets?.length) {
      const { data } = await UploadMedia(assets[0]);
      if (data) {
        const photos = [...photoInfo];
        photos.push(data);
        setPhotoInfo(photos);
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
          <Pressable onPress={() => navigation.navigate('AddNetwork')}>
            <Image
              source={require('../../../assets/images/add.png')}
              style={{ width: 24, height: 24 }}
            />
          </Pressable>
        </View>
        <ScrollView
          persistentScrollbar={true}
          showsVerticalScrollIndicator={true}>
          {networkList.length ? (
            <View style={CreateListingStyle.list}>
              {networkList.map(item => (
                <View key={item._id}>
                  <CheckboxButton
                    onPress={() => onRadioBtnClick(item)}
                    selected={item.selected}
                    key={item._id}>
                    {item.name}
                  </CheckboxButton>
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

  const renderPhoto = () => {
    if (!photoInfo.length) {
      return <></>;
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        {photoInfo?.map(photo => {
          return (
            <View style={{ margin: 8 }}>
              <Image
                source={{
                  uri: photo,
                }}
                style={{ width: 120, height: 120 }}
              />
            </View>
          );
        })}

        <View style={{ marginLeft: 8 }}>
          <Pressable onPress={uploadPhoto}>
            <Image
              source={require('../../../assets/images/add.png')}
              style={{ width: 40, height: 40 }}
            />
          </Pressable>
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

          <View>
            {photoInfo.length ? (
              renderPhoto()
            ) : (
              <Pressable onPress={uploadPhoto}>
                <Image
                  source={require('../../../assets/images/upload.png')}
                  style={{ width: 80, height: 80 }}
                />
              </Pressable>
            )}
            {!photoInfo.length && <NormalText>Upload Image</NormalText>}
          </View>
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
              editable={!listingInfo.freeGiveAway}
              keyboardType="numeric"
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
              value={listingInfo.details || ''}
            />
          </View>
        </View>

        {renderNetworkPublish()}
      </View>
    </ScrollView>
  );
}
