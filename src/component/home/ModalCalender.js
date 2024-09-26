import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../Gap';

export default function ModalCalender({visible, onRequestClose, visibleMonth}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}>
      <View style={styles.viewModal}>
        <Pressable style={styles.modalBackdrop} onPress={onRequestClose} />
        <View style={styles.viewModalContainer}>
          <View style={styles.viewModalHeader}>
            <Icon name={'calendar'} color={'black'} size={25} />
            <Text style={styles.textHeaderModal}>Pilih Bulan</Text>
            <TouchableOpacity style={{elevation: 5}} onPress={onRequestClose}>
              <Icon name={'close-circle'} color={'black'} size={25} />
            </TouchableOpacity>
          </View>
          <Gap height={15} />
          <View style={{marginHorizontal: 10}}>
            <ScrollView style={{height: '85%'}}>{visibleMonth}</ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textHeaderModal: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  textModalMonth: {
    margin: 10,
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  viewModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewModalContainer: {
    backgroundColor: 'white',
    width: '80%',
    height: '50%',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    maxWidth: 480,
  },
  modalBackdrop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.3,
  },
  viewModal: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    // maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
  },
});
