import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BoldText from '../Text/BoldText';
import NormalText from '../Text/NormalText';
import CardStyles from './Card.styles';

export default function Card() {
  const [selectedOption, setSelectedOption] = useState('option1');
  const [isdelete, setIsdelete] = useState(false);

  const renderDropdown = () => {
    return (
      <View>
        <Picker
          selectedValue={selectedOption}
          onValueChange={itemValue => setSelectedOption(itemValue)}
          mode="dropdown">
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
          <Picker.Item label="Option 3" value="option3" />
        </Picker>
      </View>
    );
  };

  return (
    <View style={CardStyles.container}>
      <View style={CardStyles.img}>
        <Image
          source={require('../../assets/images/no_image.jpeg')}
          style={{ width: 150, height: 150, marginBottom: 12 }}
        />
        <BoldText style={CardStyles.edit}>EDIT</BoldText>
      </View>

      <View>
        <View style={CardStyles.header}>
          <View>
            <BoldText>Sofa</BoldText>
            <NormalText style={CardStyles.info}>Price: Rs 15,000</NormalText>
          </View>
          <Pressable onPress={() => setIsdelete(true)}>
            <Icon name="close" size={32} color="red" />
          </Pressable>
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
      {isdelete && renderDropdown()}
    </View>
  );
}
