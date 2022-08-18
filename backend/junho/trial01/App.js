import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as FileSystem from "expo-file-system";
import { Asset } from 'expo-asset';
import * as SQLite from 'expo-sqlite';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
