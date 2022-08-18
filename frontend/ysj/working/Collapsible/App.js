import React from 'react'
import {View} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import CollapsibleTabViewTestScreen from './screens/CollapsibleTabViewTestScreen'

const App = () => {
  return (
    <SafeAreaProvider>
      <CollapsibleTabViewTestScreen  />
    </SafeAreaProvider>
  )
}

export default App;