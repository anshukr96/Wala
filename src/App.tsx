import React from 'react';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import MainNavigation from './navigation/navigation';
import { store } from './stores/index';

const App = () => {
  return (
    <Provider store={store}>
      <Toast />
      <MainNavigation />
    </Provider>
  );
};

export default App;
