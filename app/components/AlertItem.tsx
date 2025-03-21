import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Alert } from '../types/alerts';

interface AlertItemProps {
  alert: Alert;
}

export function AlertItem({ alert }: AlertItemProps) {
  const isPositive = alert.priceChange >= 0;
  const priceChangeColor = isPositive ? '#4CAF50' : '#F44336';
  const priceChangeText = `${isPositive ? '+' : ''}${alert.priceChange}%`;

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.symbol}>{alert.symbol}</Text>
        <Text style={styles.name}>{alert.name}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          ${alert.type === 'crypto' ? alert.price.toLocaleString() : alert.price.toFixed(2)}
        </Text>
        <Text style={[styles.priceChange, { color: priceChangeColor }]}>
          {priceChangeText}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  nameContainer: {
    justifyContent: 'center',
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  name: {
    fontSize: 14,
    color: '#757575',
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  priceChange: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
}); 