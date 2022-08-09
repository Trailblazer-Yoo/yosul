import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/home/Header';
import Stories from '../components/home/Stories';


function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stories />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default HomeScreen