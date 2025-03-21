import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "../types/alerts";

const ALERTS_STORAGE_KEY = "@stock_notifier_alerts";

export async function saveAlerts(alerts: Alert[]): Promise<void> {
  try {
    const jsonValue = JSON.stringify(alerts);
    await AsyncStorage.setItem(ALERTS_STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error("Error saving alerts:", error);
    throw error;
  }
}

export async function loadAlerts(): Promise<Alert[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(ALERTS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error("Error loading alerts:", error);
    return [];
  }
}
