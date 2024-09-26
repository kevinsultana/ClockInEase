import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Background, Gap} from '../component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import ApiRequest from '../api/ApiRequest';
import HomeHeader from '../component/home/HomeHeader';
import ModalCalender from '../component/home/ModalCalender';
import MonthControl from '../component/home/MonthControl';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setPresence} from '../redux/slice/presenceSlice';
import {setProfile} from '../redux/slice/authSlice';

export default function Home({navigation}) {
  const token = useSelector(state => state.credential.token);

  const dispatch = useDispatch();
  const data = useSelector(state => state.presence.presence);

  const getUser = async () => {
    try {
      const response = await ApiRequest(token).get('/user');
      dispatch(
        setProfile({
          name: response.data.user.name,
          email: response.data.user.email,
        }),
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error:', error.response?.data || error.message);
      } else {
        console.log('Submit error getuser:', error);
      }
    }
  };

  const [loading, setLoading] = useState(false);

  const getDataUser = async () => {
    setLoading(true);
    try {
      const response = await ApiRequest(token).get('/get-data-user-in-year');
      dispatch(setPresence(response.data));
      // setData(response.data);
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

  return (
    <View style={{flex: 1}}>
      <Background />

      {/* header logout, nama apk, welcome, userdata*/}
      <HomeHeader navigation={navigation} />

      {/* month control */}
      <MonthControl
        onPressLeft={() => setSeletedMonth(seletedMonth - 1)}
        disabledLeft={seletedMonth == 0}
        onPressMonth={() => setModalVisible(true)}
        textMonth={months[seletedMonth]}
        onPressRight={() => setSeletedMonth(seletedMonth + 1)}
        disabledRight={seletedMonth == new Date().getMonth()}
      />

      <Gap height={10} />

      {/* render item */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getDataUser} />
        }>
        <View style={styles.viewRenderData}>
          {data[months[seletedMonth]]?.map(
            (item, index) =>
              (
                <View
                  key={index}
                  style={[
                    styles.dataContainer,
                    item.statusPresence === 'Hadir' &&
                      styles.dataContainerHadir,
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
                  {item.isReturn === true ? (
                    <Text style={styles.dataContainerTime}>
                      {item.out?.slice(0, 5)}
                    </Text>
                  ) : (
                    <Text style={styles.dataContainerTime}>
                      {item.in?.slice(0, 5)}
                    </Text>
                  )}
                </View>
              ) || <Text>data sedang di muat</Text>,
          )}
        </View>
        <Gap height={100} />
      </ScrollView>

      {/* qr button */}
      <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <View style={styles.viewQRScan}>
          <Image
            source={require('../assets/QrCodeScanner.png')}
            style={{width: 40, height: 40}}
          />
        </View>
      </TouchableOpacity>

      {/* modal calender */}
      <ModalCalender
        visible={modalVisible}
        onRequestClose={closeModal}
        visibleMonth={visibleMonth.map((months, index) => {
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewRenderData: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 640,
    alignSelf: 'center',
  },
  viewModalMonth: {
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    marginVertical: 5,
  },
  textModalMonth: {
    margin: 10,
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
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
  viewQRScan: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    backgroundColor: '#D4CB00',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    right: 0,
    bottom: 0,
    position: 'absolute',
    elevation: 5,
  },
});
