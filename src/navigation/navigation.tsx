import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Feed from '../screens/Feed/Feed.screen';
import Home from '../screens/Home/Home.screen';
import Login from '../screens/Login/Login.screen';
import MyProfile from '../screens/MyProfile/Profile.screen';
import Profile from '../screens/Profile/Profile.screen';

export type RootStackParamList = {
  Login: undefined;
  Feed: undefined;
  BottomTabs: undefined;
  Menu: undefined;
};

export type DrawerParamList = {
  Feed: undefined;
  MyProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerMenu = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="MyProfile" component={MyProfile} />
    </Drawer.Navigator>
  );
};

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }: any) => {
            return <Icon name={'ios-home'} size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }: any) => {
            return <Icon name={'ios-settings'} size={25} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigation = () => {
  const [isSignedIn, setIsSignedIn] = useState<string | null>(null);
  useEffect(() => {
    checkForSignIn();
  }, []);

  const checkForSignIn = async () => {
    const isLoggedIn = await AsyncStorage.getItem('userDetails');
    setIsSignedIn(isLoggedIn);
  };

  return (
    <NavigationContainer>
      {isSignedIn ? (
        DrawerMenu()
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Stack.Screen
            name="Feed"
            options={{ headerShown: false }}
            component={Feed}
          />
          <Stack.Screen
            name="BottomTabs"
            options={{ headerShown: false }}
            component={MyTabs}
          />
          <Stack.Screen
            name="Menu"
            options={{ headerShown: false }}
            component={DrawerMenu}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainNavigation;
