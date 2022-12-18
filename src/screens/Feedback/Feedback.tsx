import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../../components/Button/PrimaryButton';
import RadioButton from '../../components/Radio/Radio';
import BoldText from '../../components/Text/BoldText';
import SemiBoldText from '../../components/Text/SemiBoldText';
import { OptionProps, OPTIONS } from '../../utils/constants';
import FeedbackStyles from './Feedback.styles';

export default function Feedback({ navigation }: any) {
  const [options, setOptions] = useState<OptionProps[]>(OPTIONS);
  const [feedback, setFeedback] = useState('');
  const onRadioBtnClick = (item: OptionProps) => {
    let updatedState = options.map(isSelectedItem =>
      isSelectedItem.id === item.id
        ? { ...isSelectedItem, selected: true }
        : { ...isSelectedItem, selected: false },
    );
    setOptions(updatedState);
  };

  const FeedbackHeader = () => {
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

        <View style={FeedbackStyles.headerText}>
          <BoldText>We’d love to hear from you</BoldText>
        </View>
      </View>
    );
  };

  return (
    <View style={FeedbackStyles.container}>
      <FeedbackHeader />

      <View style={{ marginVertical: 16 }}>
        <SemiBoldText>Choose one:</SemiBoldText>

        {options.map(item => (
          <View style={FeedbackStyles.options}>
            <RadioButton
              onPress={() => onRadioBtnClick(item)}
              selected={item.selected}
              key={item.id}>
              {item.name}
            </RadioButton>
          </View>
        ))}
      </View>

      <View>
        <TextInput
          placeholder="Please type your message here"
          style={FeedbackStyles.input}
          multiline
          onChangeText={text => setFeedback(text)}
        />

        <View style={FeedbackStyles.cta}>
          <PrimaryButton title="SUBMIT" onPress={() => console.log('sumbit')} />
        </View>
      </View>
    </View>
  );
}
