import { Picker } from '@react-native-picker/picker';
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../../components/Button/PrimaryButton';

import { ALUMNI_LIST, SOCIETY_LIST } from '../../Data/NetowrkList';
import CreaterModal from '../../Modal/Modal';
import NetworkAddModal from '../../Modal/NetworkAddModal';
import NoNetworkPopup from '../../Modal/NoNetworkPopup';
import { DrawerParamList } from '../../navigation/DrawerNavigation/FeedDrawerNavigation';
import { NETWORK_LIST, NETWORK_TYPE } from '../../utils/constants';
import styles from './AddNetwork.styles';

const CELL_COUNT = 4;
type Props = DrawerScreenProps<DrawerParamList, 'AddNetwork'>;
interface NetworkDetail {
  type: NETWORK_TYPE;
  value: string;
}

export default function AddNetwork({ navigation }: Props) {
  const [value, setValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNoNetworkAdded, setIsNoNetworkAdded] = useState(false);
  const [selectedList, setSelectedList] = useState<NetworkDetail>();
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderPin = () => {
    return (
      <>
        <View style={styles.pinContainer}>
          <Text style={styles.title}>Enter PIN</Text>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View key={index} onLayout={getCellOnLayoutHandler(index)}>
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={styles.submitCTA}>
          <PrimaryButton title="Submit" onPress={() => setIsSubmitted(true)} />
        </View>
      </>
    );
  };

  const showAfterNetworkAdded = () => {
    return (
      <CreaterModal onModalClose={() => setIsNoNetworkAdded(false)}>
        <NetworkAddModal
          onNavigateToHome={() => navigation.goBack()}
          onNetworkAdded={() => navigation.navigate('Feed')}
        />
      </CreaterModal>
    );
  };

  const noNetworkAdded = () => {
    return (
      <CreaterModal onModalClose={() => setIsNoNetworkAdded(false)}>
        <NoNetworkPopup
          onNavigateToHome={() => navigation.goBack()}
          onNetworkAdded={() => setIsNoNetworkAdded(false)}
        />
      </CreaterModal>
    );
  };

  return (
    <View style={{ margin: 10 }}>
      <View>
        <Pressable onPress={() => setIsNoNetworkAdded(true)}>
          <Icon name={'arrow-back-outline'} size={24} color={'black'} />
        </Pressable>
        <Text style={styles.headerText}>Add Network</Text>
      </View>

      <View style={{ margin: 10 }}>
        <Text style={styles.subtitle}>
          Add following information to access network members
        </Text>

        <View style={{ marginVertical: 20 }}>
          <Text>Residential Society</Text>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedList?.value}
              mode={'dropdown'}
              style={styles.pickerContainer}
              onValueChange={(itemValue, _) =>
                setSelectedList({
                  type: NETWORK_LIST.RESIDENTIAL,
                  value: itemValue,
                })
              }>
              {SOCIETY_LIST.map(list => (
                <Picker.Item
                  label={list.label}
                  value={list.value}
                  key={list.label}
                />
              ))}
            </Picker>
          </View>
        </View>

        {selectedList?.type == NETWORK_LIST.RESIDENTIAL && renderPin()}

        <View style={{ marginVertical: 20 }}>
          <Text>Alumni Network</Text>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedList?.value}
              style={styles.pickerContainer}
              mode={'dropdown'}
              onValueChange={(itemValue, _) =>
                setSelectedList({
                  type: NETWORK_LIST.RESIDENTIAL,
                  value: itemValue,
                })
              }>
              {ALUMNI_LIST.map(list => (
                <Picker.Item
                  label={list.label}
                  value={list.value}
                  key={list.label}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.netWarning}>
        <Text>Can't find your network?</Text>
        <Text>Submit a request to add a new network</Text>
      </View>

      {isSubmitted && showAfterNetworkAdded()}
      {isNoNetworkAdded && noNetworkAdded()}
    </View>
  );
}
