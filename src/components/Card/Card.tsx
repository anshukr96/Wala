import React, { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { OptionProps } from '../../screens/Feedback/Feedback';
import { MENU_OPTIONS } from '../../utils/constants';
import SecondaryButton from '../Button/SecondaryButton';
import RadioButton from '../Radio/Radio';
import BoldText from '../Text/BoldText';
import NormalText from '../Text/NormalText';
import CardStyles from './Card.styles';

export default function Card() {
  const [options, setOptions] = useState<OptionProps[]>(MENU_OPTIONS);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const onRadioBtnClick = (item: OptionProps) => {
    let updatedState = options.map(isSelectedItem =>
      isSelectedItem.id === item.id
        ? { ...isSelectedItem, selected: true }
        : { ...isSelectedItem, selected: false },
    );
    setOptions(updatedState);
  };

  const renderDropdown = () => {
    return (
      <View style={CardStyles.dropdownContainer}>
        <BoldText>REMOVE LISTING?</BoldText>

        <View style={{ marginVertical: 16 }}>
          {options.map(item => (
            <View key={item.id}>
              <RadioButton
                onPress={() => onRadioBtnClick(item)}
                selected={item.selected}
                key={item.id}>
                {item.name}
              </RadioButton>
            </View>
          ))}
        </View>

        <View style={CardStyles.dropdownCTA}>
          <SecondaryButton title="OK" onPress={() => setIsMenuOpened(false)} />

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
        <BoldText style={CardStyles.edit}>EDIT</BoldText>
      </View>

      <View style={{ position: 'relative' }}>
        <View style={CardStyles.header}>
          <View>
            <BoldText>Sofa</BoldText>
            <NormalText style={CardStyles.info}>Price: Rs 15,000</NormalText>
          </View>

          <Pressable onPress={() => setIsMenuOpened(menu => !menu)}>
            <Icon name="close" size={32} color="red" />
          </Pressable>
          <View style={CardStyles.dropdownPosition}>
            {isMenuOpened && renderDropdown()}
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <View style={CardStyles.details}>
            <NormalText style={CardStyles.detailText}>Seller:</NormalText>
            <BoldText style={CardStyles.detailText}>Suyash kumar</BoldText>
          </View>
          <View style={CardStyles.details}>
            <NormalText style={CardStyles.detailText}>Connection:</NormalText>
            <BoldText style={CardStyles.detailText}>Resedential,</BoldText>
          </View>
          <View>
            <NormalText style={{ textDecorationLine: 'underline' }}>
              More details
            </NormalText>
          </View>
        </View>

        <View style={CardStyles.share}>
          <NormalText style={CardStyles.text}>Share on:</NormalText>
          <Icon name="logo-whatsapp" size={32} color="green" />
          <Icon name="mail" size={32} style={{ marginLeft: 8 }} />
        </View>
      </View>
    </View>
  );
}
