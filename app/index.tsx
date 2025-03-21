import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertItem } from './components/AlertItem';
import { MOCK_ALERTS } from './types/alerts';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>您所關注的</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={MOCK_ALERTS}
        renderItem={({ item }) => <AlertItem alert={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
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