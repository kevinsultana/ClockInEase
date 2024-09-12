import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Background, FormInput, Gap} from '../component';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import ApiRequest from '../api/ApiRequest';
import {useDispatch} from 'react-redux';
import {setToken} from '../redux/slice/authSlice';

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitLogin = async () => {
    setLoading(true);
    try {
      const response = await ApiRequest().post('/login', {
        email: email,
        password: password,
      });
      await EncryptedStorage.setItem(
        'credentials',
        JSON.stringify({email: email, password: password}),
      );
      setLoading(false);
      dispatch(setToken(response.data.token));
      navigation.replace('Home');
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        Alert.alert('Gagal Login', error.response.data.message);
        console.log('Axios error:', error.response?.data || error.message);
      } else {
        Alert.alert('Gagal Login', error.message);
        console.log('Submit error:', error);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.viewContainer}>
        <View>
          <View style={styles.viewLogin}>
            <Text style={styles.textLogin}>Masuk</Text>
            <Gap height={10} />
            <FormInput
              value={email}
              onChangeText={text => setEmail(text)}
              title={'Email'}
              password={false}
              iconName={'gmail'}
              placeholder={'Masukkan Email Disini'}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
            />

            <Gap height={20} />

            <FormInput
              value={password}
              onChangeText={text => setPassword(text)}
              title={'Password'}
              password={true}
              iconName={'lock'}
              placeholder={'Masukkan Password Disini'}
              autoCapitalize={'none'}
            />

            <Gap height={30} />

            {/* btn action masuk*/}
            <TouchableNativeFeedback
              onPress={() => submitLogin()}
              disabled={email == '' || password == '' || loading}>
              <View style={styles.viewBtn}>
                {loading ? (
                  <ActivityIndicator color={'white'} size={'small'} />
                ) : (
                  <Text style={styles.textBtn}>Masuk</Text>
                )}
              </View>
            </TouchableNativeFeedback>

            <Gap height={10} />

            {/* btn action daftar */}
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('Register')}>
              <View
                style={{
                  ...styles.viewBtn,
                  backgroundColor: '#3ADE00',
                  width: 140,
                }}>
                <Text style={styles.textBtn}>Daftar</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    maxWidth: 540,
    alignSelf: 'center',
  },
  textBtn: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  viewBtn: {
    backgroundColor: '#D4CB00',
    width: 240,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  viewLogin: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogin: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
});
