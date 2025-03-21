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
  ActivityIndicator,
} from 'react-native';
import { Alert } from '../types/alerts';
import { fetchStockInfo } from '../services/stockService';

interface AddAlertModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (alert: Omit<Alert, 'id' | 'price' | 'priceChange'>) => void;
}

export function AddAlertModal({ visible, onClose, onSubmit }: AddAlertModalProps) {
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [referencePrice, setReferencePrice] = useState<string>('');
  const [ceilingPrice, setCeilingPrice] = useState('');
  const [floorPrice, setFloorPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSymbolChange = async (text: string) => {
    // Only allow numbers
    const numericValue = text.replace(/[^0-9]/g, '');
    setSymbol(numericValue);
    setError(null);

    // Only fetch if we have exactly 4 digits
    if (numericValue.length === 4) {
      setIsLoading(true);
      try {
        const stockInfo = await fetchStockInfo(numericValue);
        setName(stockInfo.name);
        setReferencePrice(stockInfo.referencePrice.toString());
      } catch (error) {
        setError('無法取得股票資訊');
        setName('');
        setReferencePrice('');
      } finally {
        setIsLoading(false);
      }
    } else {
      setName('');
      setReferencePrice('');
    }
  };

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
    setReferencePrice('');
    setCeilingPrice('');
    setFloorPrice('');
    setError(null);
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
                onChangeText={handleSymbolChange}
                placeholder="例如：2330"
                keyboardType="number-pad"
                maxLength={4}
                editable={!isLoading}
              />
              {isLoading && (
                <ActivityIndicator style={styles.loader} color="#007AFF" />
              )}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>股票名稱</Text>
              <TextInput
                style={[styles.input, styles.readOnlyInput]}
                value={name}
                placeholder="自動填入"
                editable={false}
              />
            </View>

            {referencePrice && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>參考價格</Text>
                <TextInput
                  style={[styles.input, styles.readOnlyInput]}
                  value={referencePrice}
                  placeholder="自動填入"
                  editable={false}
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>上限價格</Text>
              <TextInput
                style={styles.input}
                value={ceilingPrice}
                onChangeText={setCeilingPrice}
                placeholder="例如：150.00"
                keyboardType="decimal-pad"
                editable={!isLoading}
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
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity 
              style={[
                styles.submitButton,
                (!symbol || !name || !ceilingPrice || !floorPrice || isLoading) && styles.submitButtonDisabled
              ]} 
              onPress={handleSubmit}
              disabled={!symbol || !name || !ceilingPrice || !floorPrice || isLoading}
            >
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
  readOnlyInput: {
    backgroundColor: '#F5F5F5',
    color: '#757575',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: -8,
  },
  loader: {
    position: 'absolute',
    right: 12,
    top: 40,
  },
}); 