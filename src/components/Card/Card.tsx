import React, { useState } from 'react';
import { Image, Linking, Pressable, View } from 'react-native';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Ionicons';
import { DeletePost } from '../../api/feeds';
import { MENU_OPTIONS, OptionProps } from '../../utils/constants';
import Snackbar from '../../utils/Toast';
import SecondaryButton from '../Button/SecondaryButton';
import RadioButton from '../Radio/Radio';
import BoldText from '../Text/BoldText';
import NormalText from '../Text/NormalText';
import CardStyles from './Card.styles';

export default function Card({
  posts,
  onPostDelete,
  onPostEdit,
  isEdit = false,
}: any) {
  const [options, setOptions] = useState<OptionProps[]>(MENU_OPTIONS);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const onRadioBtnClick = (item: OptionProps) => {
    let updatedState = options.map(isSelectedItem =>
      isSelectedItem._id === item._id
        ? { ...isSelectedItem, selected: true }
        : { ...isSelectedItem, selected: false },
    );
    setOptions(updatedState);
  };

  const shareOnMail = () => {
    Linking.openURL(
      'mailto:support@example.com?subject=SendMail&body=Description',
    );
  };

  const shareOnWhatsapp = () => {
    const shareOptions = {
      title: 'Share via',
      message: 'some message',
      social: Share.Social.WHATSAPP,
    };

    Share.shareSingle(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const deleteListing = async () => {
    const option = options.filter(reason => reason.selected)[0].name;
    const body = {
      takeDownReason: option,
      takeDown: true,
    };
    const { data } = await DeletePost(posts._id, body);
    if (data) {
      Snackbar({
        type: 'success',
        message: 'Post is removed successfully',
      });
      setIsMenuOpened(false);
      onPostDelete();
    } else {
      Snackbar({
        type: 'error',
        message: 'Unable to remove post',
      });
    }
  };

  const renderDropdown = () => {
    return (
      <View style={CardStyles.dropdownContainer}>
        <BoldText>REMOVE LISTING?</BoldText>

        <View style={{ marginVertical: 16 }}>
          {options.map((item, index) => (
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

        <View style={CardStyles.dropdownCTA}>
          <Pressable>
            <SecondaryButton title="OK" onPress={deleteListing} />
          </Pressable>

          <Pressable onPress={() => setIsMenuOpened(false)}>
            <BoldText style={{ color: 'red' }}>CANCEL</BoldText>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={CardStyles.container}>
      <View style={CardStyles.img}>
        <Image
          source={require('../../assets/images/no_image.png')}
          style={{ width: 150, height: 150, marginBottom: 12 }}
        />
        {isEdit && (
          <Pressable onPress={() => onPostEdit(posts)}>
            <BoldText style={CardStyles.edit}>EDIT</BoldText>
          </Pressable>
        )}
      </View>

      <View style={{ position: 'relative' }}>
        <View style={CardStyles.header}>
          <View>
            <BoldText>{posts.title}</BoldText>
            <View style={{ flexDirection: 'row' }}>
              <NormalText style={CardStyles.info}>Price: Rs </NormalText>
              <NormalText style={CardStyles.info}>{posts.price}</NormalText>
            </View>
          </View>

          {isEdit && (
            <View>
              <Pressable onPress={() => setIsMenuOpened(menu => !menu)}>
                <Icon name="close" size={32} color="red" />
              </Pressable>
              <View style={CardStyles.dropdownPosition}>
                {isMenuOpened && renderDropdown()}
              </View>
            </View>
          )}
        </View>

        <View style={{ marginTop: 24 }}>
          <View style={CardStyles.details}>
            <NormalText style={CardStyles.detailText}>Seller:</NormalText>
            <BoldText style={CardStyles.detailText}>Suyash kumar</BoldText>
          </View>
          <View style={CardStyles.details}>
            <NormalText style={CardStyles.detailText}>Connection:</NormalText>
            <BoldText>{posts.networks[0]?.name}</BoldText>
          </View>
          <View>
            <NormalText style={{ textDecorationLine: 'underline' }}>
              More details
            </NormalText>
          </View>
        </View>

        {isEdit && (
          <View style={CardStyles.share}>
            <NormalText style={CardStyles.text}>Share on:</NormalText>
            <Pressable onPress={shareOnWhatsapp}>
              <Icon name="logo-whatsapp" size={32} color="green" />
            </Pressable>
            <Pressable onPress={shareOnMail}>
              <Icon name="mail" size={32} style={{ marginLeft: 8 }} />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
