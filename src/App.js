import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const screenWidth = Dimensions.get('window').width;

// Достаем переменные из app.config.js
const { RAPIDAPI_KEY, RAPIDAPI_HOST } = Constants.expoConfig.extra;

const App = () => {
  const [stocks, setStocks] = useState([]);

  const fetchStockData = async (symbol) => {
    try {
      const response = await fetch(
        `https://${RAPIDAPI_HOST}/stock/get-options?symbol=${symbol}&lang=en-US&region=US`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": RAPIDAPI_HOST,
            "x-rapidapi-key": RAPIDAPI_KEY,
          },
        }
      );
      const data = await response.json();
      return { symbol, data };
    } catch (error) {
      console.error(error);
      return { symbol, error: true };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const tickers = ["GAZP.ME", "SBER.ME", "LKOH.ME"]; // Пример тикеров ММВБ
      const results = await Promise.all(tickers.map(fetchStockData));
      setStocks(results);
    };
    loadData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Недооцененные акции (Yahoo Finance API)</Text>
      {stocks.map((stock, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{stock.symbol}</Text>
          {stock.error ? (
            <Text style={styles.error}>Ошибка загрузки данных</Text>
          ) : (
            <Text>Данные загружены</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 10 },
  header: { fontSize: 20, color: '#fff', textAlign: 'center', marginVertical: 10 },
  card: { backgroundColor: '#1E1E1E', padding: 15, marginVertical: 8, borderRadius: 10 },
  title: { color: '#00ff99', fontSize: 18, fontWeight: 'bold' },
  error: { color: 'red' },
});

export default App;
