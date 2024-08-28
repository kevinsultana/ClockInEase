import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Background, Gap} from '../component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalCalender from '../component/home/ModalCalender';
import axios from 'axios';

export default function Home({navigation, route}) {
  const token = route.params.token;

  const [nama, setNama] = useState('Nama Pengguna');
  const [email, setEmail] = useState('ContohEmail@gmail.com');

  const getUser = async () => {
    try {
      const response = axios.get(
        'https://dev.pondokdigital.pondokqu.id/api/user',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setNama((await response).data.user.name);
      setEmail((await response).data.user.email);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error:', error.response?.data || error.message);
      } else {
        console.log('Submit error:', error);
      }
    }
  };

  const getDataUser = async () => {
    try {
      const response = await axios.get(
        'https://dev.pondokdigital.pondokqu.id/api/get-data-user-in-year',
        {headers: {Authorization: `Bearer ${token}`}},
      );
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error:', error.response?.data || error.message);
      } else {
        console.log('Submit error:', error);
      }
    }
  };
  useEffect(() => {
    getUser();
    // getDataUser();
  }, []);

  const data = [
    {id: '1', status: 'Alpha', checked: false},
    {id: '2', status: 'Hadir', time: '08:00', checked: false},
    {id: '3', status: 'Hadir', time: '07:55', checked: true},
    {id: '4', status: 'Hadir', time: '17:45', checked: false},
    {id: '5', status: 'Hadir', time: '08:20', checked: true},
    {id: '6', status: 'Alpha', checked: false},
    {id: '7', status: 'Alpha', checked: false},
    {id: '8', status: 'Alpha', checked: false},
    {id: '9', status: 'Alpha', checked: false},
    {id: '10', status: 'Alpha', checked: false},
    {id: '11', status: 'Alpha', checked: false},
    {id: '12', status: 'Alpha', checked: false},
    {id: '13', status: 'Alpha', checked: false},
    {id: '14', status: 'Alpha', checked: false},
    {id: '15', status: 'Alpha', checked: false},
    {id: '16', status: 'Hadir', time: '08:55', checked: true},
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.item, item.status === 'Hadir' && styles.hadir]}>
      <View style={styles.viewRenderHeader}>
        <Text style={styles.dateText}>{item.id}</Text>
        {item.checked && (
          <Icon name={'check-circle-outline'} color={'white'} size={15} />
        )}
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        {item.time && <Text style={styles.timeText}>{item.time}</Text>}
      </View>
      <Gap height={5} />
    </TouchableOpacity>
  );

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);

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
              onPress={() => navigation.replace('Login')}
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
        <TouchableOpacity style={styles.btnArrow}>
          <Icon name={'chevron-left'} size={25} color={'black'} />
        </TouchableOpacity>
        <Gap width={20} />
        <TouchableOpacity style={styles.btnMonth}>
          <Text style={styles.textMonthControl}>Mei</Text>
        </TouchableOpacity>
        <Gap width={20} />
        <TouchableOpacity style={styles.btnArrow}>
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
      <FlatList
        data={data}
        numColumns={4}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.calendar}
      />

      {/* qr button */}
      <TouchableOpacity>
        <View style={styles.viewQRScan}>
          <Image
            source={require('../assets/QrCodeScanner.png')}
            style={{width: 40, height: 40}}
          />
        </View>
      </TouchableOpacity>

      {/* modal calender */}
      <ModalCalender visible={modalVisible} onRequestClose={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
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
