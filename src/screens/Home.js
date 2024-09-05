import {
  Alert,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Background, Gap} from '../component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useFocusEffect} from '@react-navigation/native';
import ApiRequest from '../api/ApiRequest';

export default function Home({navigation, route}) {
  const token = route.params.token;

  const [nama, setNama] = useState('Nama Pengguna');
  const [email, setEmail] = useState('ContohEmail@gmail.com');

  const getUser = async () => {
    try {
      const response = ApiRequest(token).get('/user');
      setNama((await response).data.user.name);
      setEmail((await response).data.user.email);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error:', error.response?.data || error.message);
      } else {
        console.log('Submit error getuser:', error);
      }
    }
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getDataUser = async () => {
    setLoading(true);
    try {
      const response = await ApiRequest(token).get('/get-data-user-in-year');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        console.log('Axios error:', error.response?.data || error.message);
      } else {
        console.log('Submit error getdatauser:', error);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser();
      getDataUser();
    }, []),
  );

  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const [seletedMonth, setSeletedMonth] = useState(new Date().getMonth());
  const currentMonth = new Date().getMonth();
  const visibleMonth = months.slice(0, currentMonth + 1);

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);

  const submitLogout = async _id => {
    Alert.alert('Keluar?', 'Sesi anda akan berakhir', [
      {
        text: 'Keluar',
        onPress: async () => {
          try {
            await EncryptedStorage.removeItem('credentials');
            navigation.replace('Login');
          } catch (error) {
            navigation.replace('Login');
          }
        },
      },
      {
        text: 'Batal',
      },
    ]);
  };

  return (
    <View style={{flex: 1}}>
      <Background />

      {/* header logout dan nama aplikasi */}
      <View style={styles.viewTopHeader}>
        <TouchableNativeFeedback>
          <View>
            <Icon
              name={'exit-to-app'}
              size={40}
              color={'black'}
              style={{transform: [{rotate: '180deg'}]}}
              onPress={() => submitLogout()}
            />
          </View>
        </TouchableNativeFeedback>
        <Gap width={10} />
        <Text style={styles.textHeader}>Clock In Ease</Text>
      </View>

      {/* selamat datang */}
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <Text style={styles.textWelcome}>Selamat datang</Text>
      </View>

      {/* username email dan icon */}
      <View style={styles.viewMainHeader}>
        <Icon name={'account-circle'} size={60} color={'black'} />
        <Gap width={10} />
        <View>
          <Text style={styles.textUserName}>{nama}</Text>
          <Text style={styles.textUserEmail}>{email}</Text>
        </View>
      </View>

      {/* month control */}
      <View style={styles.viewMonthControl}>
        <TouchableOpacity
          style={styles.btnArrow}
          onPress={() => setSeletedMonth(seletedMonth - 1)}
          disabled={seletedMonth == 0}>
          <Icon name={'chevron-left'} size={25} color={'black'} />
        </TouchableOpacity>
        <Gap width={20} />
        <TouchableOpacity
          style={styles.btnMonth}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textMonthControl}>{months[seletedMonth]}</Text>
        </TouchableOpacity>
        <Gap width={20} />
        <TouchableOpacity
          style={styles.btnArrow}
          onPress={() => setSeletedMonth(seletedMonth + 1)}
          disabled={seletedMonth == new Date().getMonth()}>
          <Icon name={'chevron-right'} size={25} color={'black'} />
        </TouchableOpacity>
        <View style={styles.viewBtnCalender}>
          <TouchableOpacity
            style={styles.btnCalender}
            onPress={() => setModalVisible(true)}>
            <Icon name={'calendar'} size={25} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>

      <Gap height={10} />

      {/* render item */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getDataUser} />
        }
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {data[months[seletedMonth]]?.map(
          (item, index) =>
            (
              <View
                key={index}
                style={[
                  styles.dataContainer,
                  item.statusPresence === 'Hadir' && styles.dataContainerHadir,
                ]}>
                <View style={styles.dataContainerHeader}>
                  <Text style={{color: 'white'}}>{index + 1}</Text>
                  {item.isReturn && (
                    <Icon
                      name={'check-circle-outline'}
                      color={'white'}
                      size={20}
                    />
                  )}
                </View>
                <Text style={styles.dataContainerPresense}>
                  {item.statusPresence}
                </Text>
                <Text style={styles.dataContainerTime}>{item.in}</Text>
              </View>
            ) || <Text>data sedang di muat</Text>,
        )}
      </ScrollView>

      {/* qr button */}
      <TouchableOpacity onPress={() => navigation.navigate('Camera', {token})}>
        <View style={styles.viewQRScan}>
          <Image
            source={require('../assets/QrCodeScanner.png')}
            style={{width: 40, height: 40}}
          />
        </View>
      </TouchableOpacity>

      {/* modal calender */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}>
        <View style={styles.viewModal}>
          <Pressable style={styles.modalBackdrop} onPress={closeModal} />
          <View style={styles.viewModalContainer}>
            <View style={styles.viewModalHeader}>
              <Icon name={'calendar'} color={'black'} size={25} />
              <Text style={styles.textHeaderModal}>Pilih Bulan</Text>
              <TouchableOpacity style={{elevation: 5}} onPress={closeModal}>
                <Icon name={'close-circle'} color={'black'} size={25} />
              </TouchableOpacity>
            </View>
            <Gap height={15} />
            <View style={{marginHorizontal: 10}}>
              <ScrollView style={{height: '85%'}}>
                {visibleMonth.map((months, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSeletedMonth(index), closeModal();
                      }}>
                      <View style={styles.viewModalMonth}>
                        <View>
                          <Text style={styles.textModalMonth}>{months}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  viewModalMonth: {
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    marginVertical: 5,
  },
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
    maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
  },
  dataContainerHadir: {
    backgroundColor: '#1E90FF',
  },
  dataContainerTime: {
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  dataContainerPresense: {
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  dataContainerHeader: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dataContainer: {
    backgroundColor: '#000000',
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 5,
  },
  textMonthControl: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
  },
  viewBtnCalender: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewQRScan: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    backgroundColor: '#D4CB00',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: 30,
  },
  viewMonthControl: {
    marginHorizontal: 30,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textUserEmail: {
    color: 'black',
    fontSize: 15,
  },
  textUserName: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  viewMainHeader: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWelcome: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    fontStyle: 'italic',
  },
  textHeader: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
  },
  viewTopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  viewRenderHeader: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnCalender: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnMonth: {
    width: 100,
    height: 25,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  btnArrow: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    flexGrow: 1,
  },
  item: {
    flex: 1,
    margin: 5,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  hadir: {
    backgroundColor: '#4DB6AC',
  },
  dateText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
  },
  statusText: {
    fontSize: 16,
    color: '#FFF',
  },
  timeText: {
    fontSize: 14,
    color: '#FFF',
  },
});
