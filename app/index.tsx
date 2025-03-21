import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertItem } from './components/AlertItem';
import { AddAlertModal } from './components/AddAlertModal';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from './types/alerts';
import { useState, useEffect } from 'react';
import { loadAlerts, saveAlerts } from './services/storageService';

export default function App() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load alerts when the app starts
  useEffect(() => {
    async function initializeAlerts() {
      try {
        const savedAlerts = await loadAlerts();
        setAlerts(savedAlerts);
      } catch (error) {
        console.error('Error loading alerts:', error);
      } finally {
        setIsLoading(false);
      }
    }
    initializeAlerts();
  }, []);

  // Save alerts whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveAlerts(alerts).catch(error => {
        console.error('Error saving alerts:', error);
      });
    }
  }, [alerts, isLoading]);

  const handleAddAlert = (newAlert: Omit<Alert, 'id' | 'price' | 'priceChange'>) => {
    const alert: Alert = {
      ...newAlert,
      id: Date.now().toString(),
      price: 0, // This will be updated by the price fetching logic
      priceChange: 0, // This will be updated by the price fetching logic
    };
    setAlerts(prev => [...prev, alert]);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>載入中...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#757575',
  },
}); 