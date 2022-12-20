import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GetUserDetails } from '../../api/user';
import PrimaryButton from '../../components/Button/PrimaryButton';
import BoldText from '../../components/Text/BoldText';
import NormalText from '../../components/Text/NormalText';
import SemiBoldText from '../../components/Text/SemiBoldText';
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

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onDelete = () => {
    setIsDeletePopup(true);
  };

  const showDeletePopup = () => {
    return (
      <CreaterModal onModalClose={() => setIsDeletePopup(false)}>
        <DeleteNetworkModal
          onDelete={() => console.log('yes')}
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
      },
    });
  };

  const ProfileHeader = () => {
    return (
      <View>
        <Pressable onPress={() => navigation.goBack()}>
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
    return profileInfo.networks.map(list => {
      return (
        <View style={ProfileStyles.header} key={list.name}>
          <NormalText style={ProfileStyles.listname}>{list.name}</NormalText>
          <NormalText style={ProfileStyles.listname}>
            {list.type === NETWORK_LIST.ALUMNI
              ? 'Email'
              : `PIN: ${list.joiningCode}`}
          </NormalText>
          <Pressable onPress={onDelete}>
            <Icon name="trash-outline" size={16} />
          </Pressable>
        </View>
      );
    });
  };

  return (
    <View style={ProfileStyles.container}>
      <ProfileHeader />

      <View style={ProfileStyles.profile}>
        <View style={ProfileStyles.upload}>
          <Icon name={'person-circle-outline'} size={150} color={'black'} />
        </View>

        <View style={ProfileStyles.info}>
          <View style={ProfileStyles.details}>
            <BoldText>Name:</BoldText>
            <NormalText>{profileInfo.username}</NormalText>
          </View>

          <View style={ProfileStyles.details}>
            <BoldText>Phone:</BoldText>
            <NormalText>{profileInfo.phoneNumber}</NormalText>
          </View>
        </View>
      </View>

      <View style={ProfileStyles.list}>
        <SemiBoldText>Active Networks:</SemiBoldText>

        <View style={ProfileStyles.header}>
          <Text style={ProfileStyles.block}></Text>
          <NormalText style={ProfileStyles.listname}>Verification</NormalText>
          <Text style={ProfileStyles.block}></Text>
        </View>

        {renderNetworkList()}

        <View style={ProfileStyles.cta}>
          <PrimaryButton
            title="ADD NETWORK"
            onPress={() => console.log('presses')}
            style={ProfileStyles.button}
          />
        </View>
      </View>

      {isDeletePopup && showDeletePopup()}
    </View>
  );
}
