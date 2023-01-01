import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { UpdateNetwork } from '../../api/network';
import { GetUserDetails } from '../../api/user';
import PrimaryButton from '../../components/Button/PrimaryButton';
import BoldText from '../../components/Text/BoldText';
import NormalText from '../../components/Text/NormalText';
import DeleteNetworkModal from '../../Modal/DeleteNetworkModal';
import CreaterModal from '../../Modal/Modal';
import { UserInfoBody } from '../../types/users/user';
import { NETWORK_LIST, USERID } from '../../utils/constants';
import Snackbar from '../../utils/Toast';
import ProfileStyles from './MyProfile.styles';

export default function MyProfile({ navigation }: any) {
  const [profileInfo, setProfileInfo] = useState<UserInfoBody>({
    username: '',
    phoneNumber: '',
    profileImage: '',
    networks: [],
  });
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('');

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserInfo();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const getUserInfo = async () => {
    const userID = await AsyncStorage.getItem(USERID);
    const { data } = await GetUserDetails(userID || '');
    if (data) {
      setProfileInfo(data);
    } else {
      Snackbar({
        type: 'error',
        message: 'Unable to get User Details',
      });
      navigation.goBack();
    }
  };

  const onDelete = async () => {
    const saveNetwork = profileInfo.networks?.filter(
      network => network._id !== selectedNetwork,
    );

    const requestBody = { networks: saveNetwork };
    const { data } = await UpdateNetwork(requestBody);
    if (data) {
      Snackbar({
        type: 'success',
        message: data,
      });
      setIsDeletePopup(false);
      setSelectedNetwork('');
      getUserInfo();
    } else {
      Snackbar({
        type: 'error',
        message: 'Unable to delete the network',
      });
    }
  };

  const showDeletePopup = () => {
    return (
      <CreaterModal onModalClose={() => setIsDeletePopup(false)}>
        <DeleteNetworkModal
          onDelete={onDelete}
          cancelDelete={() => setIsDeletePopup(false)}
        />
      </CreaterModal>
    );
  };

  const editProfile = () => {
    navigation.navigate('EditProfile', {
      profile: {
        name: profileInfo.username,
        phoneno: profileInfo.phoneNumber,
        imageUrl: profileInfo.profileImage,
        email: profileInfo.email,
      },
    });
  };

  const ProfileHeader = () => {
    return (
      <View>
        <Pressable onPress={() => navigation.navigate('Feeds')}>
          <Icon
            name={'arrow-back-outline'}
            size={30}
            color={'black'}
            style={{ marginLeft: -16 }}
          />
        </Pressable>

        <View style={ProfileStyles.headerText}>
          <BoldText>MY PROFILE</BoldText>

          <Pressable onPress={editProfile}>
            <Text style={ProfileStyles.edit}>EDIT</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const renderNetworkList = () => {
    return (
      profileInfo.networks &&
      profileInfo.networks.map(list => {
        return (
          <View style={ProfileStyles.header} key={list.name}>
            <NormalText style={ProfileStyles.listname}>{list.name}</NormalText>
            <NormalText style={ProfileStyles.listname}>
              {list.type === NETWORK_LIST.ALUMNI
                ? 'Email'
                : `PIN: ${list.joiningCode}`}
            </NormalText>
            <Pressable
              onPress={() => {
                setIsDeletePopup(true);
                setSelectedNetwork(list._id);
              }}>
              <Icon name="trash-outline" size={16} />
            </Pressable>
          </View>
        );
      })
    );
  };

  return (
    <View style={ProfileStyles.container}>
      <ProfileHeader />

      <View style={ProfileStyles.profile}>
        <Pressable style={ProfileStyles.upload}>
          {profileInfo.profileImage !== '' ? (
            <Image
              source={{
                uri: profileInfo.profileImage,
              }}
              style={{ width: 120, height: 120 }}
            />
          ) : (
            <Icon name={'person-circle-outline'} size={150} color={'black'} />
          )}
        </Pressable>

        <View style={ProfileStyles.info}>
          <View style={ProfileStyles.details}>
            <BoldText>Name:</BoldText>
            <NormalText style={{ marginLeft: 14 }}>
              {profileInfo.username}
            </NormalText>
          </View>

          <View style={ProfileStyles.details}>
            <BoldText>Phone:</BoldText>
            <NormalText style={{ marginLeft: 12 }}>
              {profileInfo.phoneNumber || ''}
            </NormalText>
          </View>
        </View>
      </View>

      {profileInfo.networks?.length ? (
        <View style={ProfileStyles.list}>
          <BoldText>Active Networks:</BoldText>

          <View style={ProfileStyles.header}>
            <Text style={ProfileStyles.block}></Text>
            <BoldText style={ProfileStyles.listname}>Verification</BoldText>
            <Text style={ProfileStyles.block}></Text>
          </View>

          {renderNetworkList()}
        </View>
      ) : null}

      <View style={ProfileStyles.cta}>
        <PrimaryButton
          title="ADD NETWORK"
          onPress={() => navigation.navigate('AddNetwork')}
          style={ProfileStyles.button}
        />
      </View>

      {isDeletePopup && showDeletePopup()}
    </View>
  );
}
