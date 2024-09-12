import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import {refreshToken} from '../redux/slice/authSlice';

export default function Demo() {
  const token = useSelector(state => state.credential.token);
  const dispatch = useDispatch();

  const [newToken, setNewToken] = useState('');
  return (
    <View>
      <Text>{token}</Text>
      <TextInput
        value={newToken}
        placeholder="masukkan disini"
        onChangeText={e => setNewToken(e)}
      />
      <Button title="tes" onPress={() => dispatch(refreshToken(newToken))} />
    </View>
  );
}

const styles = StyleSheet.create({});
