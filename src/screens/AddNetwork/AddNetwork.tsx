import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import PrimaryButton from '../../components/Button/PrimaryButton';

import { ALUMNI_LIST, SOCIETY_LIST } from '../../Data/NetowrkList';
import styles from './AddNetwork.styles';

const CELL_COUNT = 4;

export default function AddNetwork() {
  const [value, setValue] = useState('');
  const [selectedList, setSelectedList] = useState();
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
          <PrimaryButton title="Submit" onPress={() => console.log('submit')} />
        </View>
      </>
    );
  };
  return (
    <View style={{ margin: 20 }}>
      <Text style={styles.headerText}>Add Network</Text>

      <View style={{ margin: 10 }}>
        <Text style={styles.subtitle}>
          Add following information to access network members
        </Text>

        <View style={{ marginVertical: 20 }}>
          <Text>Residential Society</Text>
          <View>
            <Picker
              selectedValue={selectedList}
              mode={'dropdown'}
              style={styles.pickerContainer}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedList(itemValue)
              }>
              {SOCIETY_LIST.map(list => (
                <Picker.Item label={list.label} value={list.value} />
              ))}
            </Picker>
          </View>
        </View>

        {renderPin()}

        <View style={{ marginVertical: 20 }}>
          <Text>Alumni Network</Text>
          <Picker
            selectedValue={selectedList}
            style={styles.pickerContainer}
            mode={'dropdown'}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedList(itemValue)
            }>
            {ALUMNI_LIST.map(list => (
              <Picker.Item label={list.label} value={list.value} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.netWarning}>
        <Text>Can't find your network?</Text>
        <Text>Submit a request to add a new network</Text>
      </View>
    </View>
  );
}
