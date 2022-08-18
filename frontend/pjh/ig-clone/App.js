import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen'
import SignedInStack from './navigation';
import NewPostScreen from './screens/NewPostScreen';

export default function App() {
  return (
    <SignedInStack />
  );
}


