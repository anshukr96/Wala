import React from 'react';
import { Pressable, View } from 'react-native';
import { CameraOptions, launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../../components/Button/PrimaryButton';
import BoldText from '../../components/Text/BoldText';
import NormalText from '../../components/Text/NormalText';
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
            <NormalText>{profile.name}</NormalText>
          </View>

          <View style={ProfileStyles.details}>
            <BoldText>Phone:</BoldText>
            <NormalText>{profile.phoneno}</NormalText>
          </View>
        </View>
      </View>

      <View style={ProfileStyles.cta}>
        <PrimaryButton
          title="UPDATE PROFILE"
          onPress={() => console.log('presses')}
          style={ProfileStyles.button}
        />
      </View>
    </View>
  );
}
