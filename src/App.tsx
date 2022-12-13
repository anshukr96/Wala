import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import MainNavigation from './navigation/navigation';
import commonStyles from './screens/common.styles';
import { store } from './stores/index';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
      <SafeAreaView style={commonStyles.SafeAreaView1} />
      <SafeAreaView style={commonStyles.SafeAreaView2}>
        <MainNavigation />
      </SafeAreaView>
      <Toast />
    </Provider>
  );
};

export default App;
