import React, { useState } from 'react';
import { Image, Modal, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils/constants';

export default function ImageModal({ source }: any) {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ alignSelf: 'flex-end', margin: 24 }}>
            <Pressable onPress={() => setModalVisible(false)}>
              <Icon name="close" size={32} color="gray" />
            </Pressable>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: source,
              }}
              style={{ width: WINDOW_WIDTH - 30, height: WINDOW_HEIGHT / 2 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
