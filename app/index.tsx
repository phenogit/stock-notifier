import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertItem } from './components/AlertItem';
import { AddAlertModal } from './components/AddAlertModal';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from './types/alerts';
import { useState } from 'react';

export default function App() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddAlert = (newAlert: Omit<Alert, 'id' | 'price' | 'priceChange'>) => {
    const alert: Alert = {
      ...newAlert,
      id: Date.now().toString(),
      price: 0, // This will be updated by the price fetching logic
      priceChange: 0, // This will be updated by the price fetching logic
    };
    setAlerts(prev => [...prev, alert]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>您所關注的</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <FlatList<Alert>
        data={alerts}
        renderItem={({ item }) => <AlertItem alert={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <AddAlertModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddAlert}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
  },
  addButton: {
    padding: 8,
  },
}); 