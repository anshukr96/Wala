import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { CameraOptions, launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { UpdateUserDetails } from '../../api/user';
import PrimaryButton from '../../components/Button/PrimaryButton';
import PrimaryInput from '../../components/Input';
import BoldText from '../../components/Text/BoldText';
import { UserInfoBody } from '../../types/users/user';
import Snackbar from '../../utils/Toast';
import ProfileStyles from './MyProfile.styles';

export const cameraOptions: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 250,
  maxHeight: 250,
  quality: 0.7,
  includeBase64: true,
};

export default function EditProfile({ route, navigation }: any) {
  const { profile } = route.params;
  const [profileInfo, setProfileInfo] = useState<UserInfoBody>({
    username: profile.name,
    phoneNumber: profile.phoneno,
    profileImage: profile.imageUrl,
  });

  const updateUserInfo = async () => {
    const requestbody = {
      username: profileInfo.username,
      profileImage: profileInfo.profileImage,
    };

    const { data, error } = await UpdateUserDetails(requestbody);
    if (data) {
      Snackbar({
        message: data,
        type: 'success',
      });
    } else {
      Snackbar({
        message: error,
        type: 'error',
      });
    }
  };

  const uploadPhoto = async () => {
    const result = await launchCamera(cameraOptions);
    console.log(result);
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
          <Icon name={'person-circle-outline'} size={150} color={'black'} />
        </Pressable>

        <View style={ProfileStyles.info}>
          <View style={ProfileStyles.details}>
            <BoldText>Name:</BoldText>
            <PrimaryInput
              onChangeText={() => console.log('dfs')}
              placeholder={'Username'}
              value={profile.name}
            />
          </View>

          <View style={ProfileStyles.details}>
            <BoldText>Phone:</BoldText>
            <PrimaryInput
              onChangeText={() => console.log('dfs')}
              placeholder={'PHone Number'}
              value={profile.phoneno}
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
