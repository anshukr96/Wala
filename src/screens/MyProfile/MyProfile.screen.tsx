import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { CameraOptions, launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../../components/Button/PrimaryButton';
import BoldText from '../../components/Text/BoldText';
import NormalText from '../../components/Text/NormalText';
import SemiBoldText from '../../components/Text/SemiBoldText';
import DeleteNetworkModal from '../../Modal/DeleteNetworkModal';
import CreaterModal from '../../Modal/Modal';
import ProfileStyles from './MyProfile.styles';

const camerOptions: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 250,
  maxHeight: 250,
  quality: 0.7,
  includeBase64: true,
};

export default function MyProfile({ navigation }: any) {
  const [networkList, setNetworkList] = useState([
    { name: 'Godrej Woodsman Estate', verificationMethod: 'PIN: 1234' },
    { name: 'Indian School of Business', verificationMethod: 'Email' },
  ]);
  const [isDeletePopup, setIsDeletePopup] = useState(false);

  const onDelete = () => {
    setIsDeletePopup(true);
  };

  const uploadPhoto = async () => {
    const result = await launchCamera(camerOptions);
    console.log(result);
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
          <Text style={ProfileStyles.edit}>EDIT</Text>
        </View>
      </View>
    );
  };

  const renderNetworkList = () => {
    return networkList.map(list => {
      return (
        <View style={ProfileStyles.header} key={list.name}>
          <NormalText style={ProfileStyles.listname}>{list.name}</NormalText>
          <NormalText style={ProfileStyles.listname}>
            {list.verificationMethod}
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
        <Pressable onPress={uploadPhoto} style={ProfileStyles.upload}>
          <Icon name={'person-circle-outline'} size={150} color={'black'} />
        </Pressable>

        <View style={ProfileStyles.info}>
          <View style={ProfileStyles.details}>
            <BoldText>Name:</BoldText>
            <NormalText>Anuj Siraf</NormalText>
          </View>

          <View style={ProfileStyles.details}>
            <BoldText>Phone:</BoldText>
            <NormalText>9871609422</NormalText>
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
