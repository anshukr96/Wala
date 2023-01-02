import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils/constants';

export default function ImageCarousel({ images, onModalClose }: any) {
  const [visible, setVisible] = useState(true);
  const [current, setCurrent] = useState(0);

  const showModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    onModalClose();
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showModal}>
        <Text>Open Modal</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={{ alignSelf: 'flex-end', margin: 24 }}>
            <Pressable onPress={closeModal}>
              <Icon name="close" size={32} color="gray" />
            </Pressable>
          </View>

          <View style={styles.slidesContainer}>
            <Image
              source={{
                uri: images[current],
              }}
              style={{ width: WINDOW_WIDTH - 30, height: WINDOW_HEIGHT / 2 }}
            />
          </View>

          <View style={styles.carouselContainer}>
            <TouchableOpacity
              onPress={() => setCurrent(current - 1)}
              disabled={current === 0}>
              <Text>Prev</Text>
            </TouchableOpacity>
            <Text>{current + 1}</Text>
            <TouchableOpacity
              onPress={() => setCurrent(current + 1)}
              disabled={current === images.length - 1}>
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  slidesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
});
