import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BoldText from '../../components/Text/BoldText';

export default function MyProfile() {
  const ProfileHeader = () => {
    return (
      <View>
        <Icon name="back" size={24} />

        <View>
          <BoldText>MY PROFILE</BoldText>
          <Text>EDIT</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <ProfileHeader />

      <View></View>
    </View>
  );
}
