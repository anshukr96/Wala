import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext } from 'react';
import { requestInterceptor } from '../lib/axiosInterceptor';
import Login from '../screens/Login/Login.screen';
import { TOKEN } from '../utils/constants';
import Snackbar from '../utils/Toast';
import FeedDrawerMenu from './DrawerNavigation/FeedDrawerNavigation';
import MyTabs from './TabNavigation/BottomTabNavigation';

export type RootStackParamList = {
  Login: undefined;
  Feed: undefined;
  BottomTabs: undefined;
  Menu: undefined;
};

export interface AuthContextInterface {
  signIn: (data: any) => Promise<void>;
  signOut: () => void;
  signUp: (data: any) => Promise<void>;
}

/* to see network call on debugging */
// if (__DEV__) {
//   global.XMLHttpRequest = global.originalXMLHttpRequest
//     ? global.originalXMLHttpRequest
//     : global.XMLHttpRequest;
//   global.FormData = global.originalFormData
//     ? global.originalFormData
//     : global.FormData;
// }

const Stack = createNativeStackNavigator<RootStackParamList>();
export const AuthContext = createContext<AuthContextInterface | null>(null);

const MainNavigation = () => {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem(TOKEN);
      } catch (e) {
        Snackbar({
          type: 'error',
          message: 'User not found',
          position: 'bottom',
        });
      }

      requestInterceptor();

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        AsyncStorage.setItem(TOKEN, data.token);
        requestInterceptor();
        dispatch({ type: 'SIGN_IN', token: data.token });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data: any) => {
        dispatch({ type: 'SIGN_IN', token: data.token });
      },
    }),
    [],
  );

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        {!state.userToken ? (
          FeedDrawerMenu()
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={Login}
            />
            <Stack.Screen
              name="BottomTabs"
              options={{ headerShown: false }}
              component={MyTabs}
            />
          </Stack.Navigator>
        )}
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default MainNavigation;
