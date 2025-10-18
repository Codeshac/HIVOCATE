
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { RepostProvider } from './src/screens/RepostContext';

// Import Main Navigator (which contains all your navigation structure)
import MainNavigator from './src/navigation/MainNavigator';

function App(): React.JSX.Element {
  return (
    <RepostProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor="#000000" 
          translucent={true}
        />
        <MainNavigator />
      </SafeAreaView>
    </RepostProvider>
  );
}

export default App;