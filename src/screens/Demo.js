import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Pastikan Anda memiliki library ini

const YourComponent = ({selectedMonth, data}) => {
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulasi pengambilan data dari backend
        // Gantilah dengan kode pengambilan data yang sebenarnya
        // Misalnya menggunakan fetch atau axios
        // const response = await fetch('YOUR_BACKEND_URL');
        // const result = await response.json();

        // Ambil data sesuai bulan yang dipilih
        const loadedData = data[months[selectedMonth]] || [];
        setDataLoaded(loadedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, data]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
      {dataLoaded.length === 0 ? (
        <Text>No data available for the selected month.</Text>
      ) : (
        dataLoaded.map((item, index) => (
          <View
            key={index}
            style={[
              styles.dataContainer,
              item.statusPresence === 'Hadir' && styles.dataContainerHadir,
            ]}>
            <View style={styles.dataContainerHeader}>
              <Text style={{color: 'white'}}>{index + 1}</Text>
              {item.isReturn && (
                <Icon name={'check-circle-outline'} color={'white'} size={20} />
              )}
            </View>
            <Text style={styles.dataContainerPresense}>
              {item.statusPresence}
            </Text>
            <Text style={styles.dataContainerTime}>{item.in}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    padding: 16,
    margin: 8,
    backgroundColor: '#ccc',
    borderRadius: 8,
    width: 150, // Sesuaikan ukuran sesuai kebutuhan
  },
  dataContainerHadir: {
    backgroundColor: '#4caf50',
  },
  dataContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataContainerPresense: {
    fontSize: 16,
    marginTop: 8,
  },
  dataContainerTime: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default YourComponent;
