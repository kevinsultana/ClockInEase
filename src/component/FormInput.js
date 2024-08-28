import {
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {useState} from 'react';
import Gap from './Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FormInput({
  title,
  password,
  iconName,
  placeholder,
  keyboardType,
  autoCapitalize,
  value,
  onChangeText,
}) {
  const [secure, setSecure] = useState(true);
  return (
    <View style={styles.viewModal}>
      <Text style={styles.textForm}>{title}</Text>
      <Gap height={5} />
      <View style={styles.borderTextInput}>
        <Gap width={10} />
        <Icon name={iconName} size={20} color={'black'} />
        <Gap width={5} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={'grey'}
          style={{flex: 1}}
          secureTextEntry={password && secure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          value={value}
          onChangeText={onChangeText}
        />
        <Gap width={5} />
        {password && (
          <TouchableNativeFeedback onPress={() => setSecure(!secure)}>
            <Icon name={secure ? 'eye' : 'eye-off'} size={20} color={'black'} />
          </TouchableNativeFeedback>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  borderTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#B8BC00',
  },
  textForm: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  viewModal: {
    width: '80%',
    alignContent: 'center',
  },
});
