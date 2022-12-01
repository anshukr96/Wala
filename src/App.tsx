import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import MainNavigation from './navigation/navigation';
import { store } from './stores/index';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
