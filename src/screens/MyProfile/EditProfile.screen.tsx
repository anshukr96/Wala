import React, { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import {
  CameraOptions,
  launchCamera,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { UpdateUserDetails, UploadMedia } from '../../api/user';
import PrimaryButton from '../../components/Button/PrimaryButton';
import PrimaryInput from '../../components/Input';
import BoldText from '../../components/Text/BoldText';
import { UserInfoBody } from '../../types/users/user';
import Snackbar from '../../utils/Toast';
import ProfileStyles from './MyProfile.styles';

export const cameraOptions: CameraOptions = {
  maxWidth: 250,
  maxHeight: 250,
  quality: 0.7 as PhotoQuality,
  mediaType: 'photo' as MediaType,
};

export default function EditProfile({ route, navigation }: any) {
  const { profile } = route.params;
  const [profileInfo, setProfileInfo] = useState<UserInfoBody>({
    username: profile.name,
    email: profile.email,
    profileImage: profile.imageUrl,
  });

  const updateDetails = (text: any, type: string) => {
    const details = { ...profileInfo, [type]: text };
    setProfileInfo(details);
  };

  const updateUserInfo = async () => {
    const requestbody = {
      username: profileInfo.username,
      profileImage: profileInfo.profileImage,
      email: profileInfo?.email,
    };

    const { data, error } = await UpdateUserDetails(requestbody);

    if (data) {
      Snackbar({
        message: data,
        type: 'success',
      });
      navigation.navigate('MyProfile');
    } else {
      Snackbar({
        message: error,
        type: 'error',
      });
    }
  };

  const uploadPhoto = async () => {
    const { assets } = await launchCamera(cameraOptions);
    if (assets?.length) {
      const { data } = await UploadMedia(assets[0]);
      if (data) {
        let info = { ...profileInfo };
        info = { ...info, profileImage: data };
        setProfileInfo(info);
      } else {
        Snackbar({
          type: 'error',
          message: 'Unable to upload image',
        });
      }
    }
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
          <BoldText>EDIT PROFILE</BoldText>
        </View>
      </View>
    );
  };

  return (
    <View style={ProfileStyles.container}>
      <ProfileHeader />

      <View style={ProfileStyles.profile}>
        <Pressable onPress={uploadPhoto} style={ProfileStyles.upload}>
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
            <PrimaryInput
              onChangeText={text => updateDetails(text, 'username')}
              placeholder={'Username'}
              value={profileInfo.username}
              style={{ width: 250 }}
            />
          </View>

          <View style={ProfileStyles.details}>
            <BoldText>Email:</BoldText>
            <PrimaryInput
              onChangeText={text => updateDetails(text, 'email')}
              placeholder={'Email'}
              value={profileInfo.email || ''}
              style={{ width: 250 }}
            />
          </View>
        </View>
      </View>

      <View style={ProfileStyles.cta}>
        <PrimaryButton
          title="UPDATE PROFILE"
          onPress={updateUserInfo}
          style={ProfileStyles.button}
        />
      </View>
    </View>
  );
}
