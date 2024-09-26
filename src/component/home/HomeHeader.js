import {
  Alert,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../Gap';
import {useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function HomeHeader({navigation}) {
  const userData = useSelector(state => state.credential.profile);

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
    <View>
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
      <View style={{marginHorizontal: 20, marginVertical: 5}}>
        <Text style={styles.textWelcome}>Selamat datang</Text>
      </View>

      {/* username email dan icon */}
      <View style={styles.viewMainHeader}>
        <Icon name={'account-circle'} size={60} color={'black'} />
        <Gap width={10} />
        <View>
          <Text style={styles.textUserName}>{userData.name}</Text>
          <Text style={styles.textUserEmail}>{userData.email}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginVertical: 5,
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
    marginBottom: 5,
  },
});
