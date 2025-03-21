import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Alert } from '../types/alerts';

interface AddAlertModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (alert: Omit<Alert, 'id' | 'price' | 'priceChange'>) => void;
}

export function AddAlertModal({ visible, onClose, onSubmit }: AddAlertModalProps) {
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [ceilingPrice, setCeilingPrice] = useState('');
  const [floorPrice, setFloorPrice] = useState('');

  const handleSubmit = () => {
    if (!symbol || !name || !ceilingPrice || !floorPrice) return;

    onSubmit({
      symbol: symbol.toUpperCase(),
      name,
      type: 'stock',
      ceilingPrice: parseFloat(ceilingPrice),
      floorPrice: parseFloat(floorPrice),
    });

    // Reset form
    setSymbol('');
    setName('');
    setCeilingPrice('');
    setFloorPrice('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>新增股票提醒</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>股票代碼</Text>
              <TextInput
                style={styles.input}
                value={symbol}
                onChangeText={setSymbol}
                placeholder="例如：AAPL"
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>股票名稱</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="例如：Apple Inc."
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>上限價格</Text>
              <TextInput
                style={styles.input}
                value={ceilingPrice}
                onChangeText={setCeilingPrice}
                placeholder="例如：150.00"
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>下限價格</Text>
              <TextInput
                style={styles.input}
                value={floorPrice}
                onChangeText={setFloorPrice}
                placeholder="例如：140.00"
                keyboardType="decimal-pad"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>新增</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  closeButton: {
    fontSize: 24,
    color: '#757575',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 