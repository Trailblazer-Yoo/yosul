import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as FileSystem from "expo-file-system";
import { Asset } from 'expo-asset';
import * as SQLite from 'expo-sqlite';

FileSystem.downloadAsync(
  Asset.fromModule(require("./assets/database/thesool.db")).uri,
  `${FileSystem.documentDirectory}SQLite/thesool.db`
)
  try {
    const db = SQLite.openDatabase('thesool.db')
    console.log(db);
    db.transaction(function(tx) {
        tx.executeSql(
          'SELECT * FROM sul_data;',
          [],
          function(tx, res) {
            console.log(res.rows.length);
          },
          function(tx, err) {
            console.error(err)
          }
        )
      });
    }
  catch (err) {
      console.error(err)
}

export default function App() {

  return (
    <View style={styles.container}>
      <Text>'Hello'</Text>
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
