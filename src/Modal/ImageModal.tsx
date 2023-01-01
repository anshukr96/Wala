import React, { useState } from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';

export default function ImageModal({ source }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}>
            <Image style={{ flex: 1 }} source={source} />
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <Image source={source} />
      </TouchableOpacity>
    </View>
  );
}
