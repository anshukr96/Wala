import { Picker } from '@react-native-picker/picker';
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Icon from 'react-native-vector-icons/Ionicons';
import { AddToNetwork, GetNetworkList } from '../../api/network';
import PrimaryButton from '../../components/Button/PrimaryButton';

import CreaterModal from '../../Modal/Modal';
import NetworkAddModal from '../../Modal/NetworkAddModal';
import NoNetworkPopup from '../../Modal/NoNetworkPopup';
import { DrawerParamList } from '../../navigation/DrawerNavigation/FeedDrawerNavigation';
import { NetworkListResponse } from '../../types/network/network';
import { isIOS, NETWORK_LIST, NETWORK_TYPE } from '../../utils/constants';
import Snackbar from '../../utils/Toast';
import styles from './AddNetwork.styles';

const CELL_COUNT = 4;
type Props = DrawerScreenProps<DrawerParamList, 'AddNetwork'>;
interface NetworkDetail {
  type: NETWORK_TYPE;
  value: string;
  _id: string;
}

export default function AddNetwork({ navigation }: Props) {
  const [value, setValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNoNetworkAdded, setIsNoNetworkAdded] = useState(false);
  const [resedentialSocietyList, setResedentialSocietyList] = useState<
    NetworkListResponse[]
  >([]);
  const [alumniSocietyList, setAlumniSocietyList] = useState<
    NetworkListResponse[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedList, setSelectedList] = useState<NetworkDetail>(
    {} as NetworkDetail,
  );
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    populatenetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const populatenetwork = async () => {
    const { data } = await GetNetworkList();
    let resedentialList: NetworkListResponse[] = [];
    let societyList: NetworkListResponse[] = [];

    if (data) {
      data.map((list: NetworkListResponse) => {
        if (list.type == NETWORK_LIST.RESIDENTIAL) {
          resedentialList.push(list);
        } else {
          societyList.push(list);
        }
      });

      setResedentialSocietyList(resedentialList);
      setAlumniSocietyList(societyList);
      setLoading(false);
    } else {
      Snackbar({
        type: 'error',
        message: 'unable to fetch network list',
        position: 'bottom',
      });
      navigation.goBack();
    }
  };

  const showAfterNetworkAdded = () => {
    return (
      <CreaterModal onModalClose={() => setIsNoNetworkAdded(false)}>
        <NetworkAddModal
          onNavigateToHome={() => navigation.goBack()}
          onNetworkAdded={() => setIsSubmitted(false)}
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

  const addToNetwork = async () => {
    const body = {
      networkId: selectedList?._id || '',
      joiningCode: value,
    };

    const { message, error } = await AddToNetwork(body);

    if (!error) {
      Snackbar({
        type: 'success',
        message: message,
        position: 'bottom',
      });
      navigation.goBack();
    } else {
      Snackbar({
        type: 'error',
        message: message,
        position: 'bottom',
      });
    }
  };

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
          <PrimaryButton title="Submit" onPress={addToNetwork} />
        </View>
      </>
    );
  };

  return (
    <ScrollView>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
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
              <View style={isIOS ? {} : styles.dropdownContainer}>
                <Picker
                  selectedValue={selectedList.value}
                  mode={'dropdown'}
                  style={isIOS ? {} : styles.pickerContainer}
                  dropdownIconColor={'black'}
                  onBlur={() =>
                    resedentialSocietyList.length === 1 &&
                    setSelectedList({
                      type: NETWORK_LIST.RESIDENTIAL,
                      value: resedentialSocietyList[0].name,
                      _id: resedentialSocietyList[0]._id,
                    })
                  }
                  onValueChange={(itemValue, index) => {
                    setSelectedList({
                      type: NETWORK_LIST.RESIDENTIAL,
                      value: itemValue,
                      _id: resedentialSocietyList[index]._id,
                    });
                  }}>
                  {resedentialSocietyList.map(list => (
                    <Picker.Item
                      label={list.name}
                      value={list.name}
                      key={list._id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {selectedList?.type == NETWORK_LIST.RESIDENTIAL && renderPin()}

            <View style={{ marginVertical: isIOS ? 0 : 20 }}>
              <Text>Alumni Network</Text>
              <View
                style={Platform.OS == 'ios' ? {} : styles.dropdownContainer}>
                <Picker
                  selectedValue={selectedList?.value}
                  style={Platform.OS == 'ios' ? {} : styles.pickerContainer}
                  dropdownIconColor={'black'}
                  mode={'dropdown'}
                  onValueChange={(itemValue, index) =>
                    setSelectedList({
                      type: NETWORK_LIST.ALUMNI,
                      value: itemValue,
                      _id: alumniSocietyList[index]._id,
                    })
                  }>
                  {alumniSocietyList.map(list => (
                    <Picker.Item
                      label={list.name}
                      value={list.name}
                      key={list._id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.netWarning}>
            <Text style={styles.netWarningText}>Can't find your network?</Text>
            <Text style={styles.netWarningText}>
              Submit a request to add a new network
            </Text>
          </View>

          {isSubmitted && showAfterNetworkAdded()}
          {isNoNetworkAdded && noNetworkAdded()}
        </View>
      )}
    </ScrollView>
  );
}
