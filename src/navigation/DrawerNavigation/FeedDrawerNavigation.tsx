import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddNetwork from '../../screens/AddNetwork/AddNetwork';
import Feed from '../../screens/Feed/Feed.screen';
import MyProfile from '../../screens/MyProfile/Profile.screen';

export type DrawerParamList = {
  Feed: undefined;
  MyProfile: undefined;
  AddNetwork: undefined;
};

export type StackParamList = {
  Listing: undefined;
  AddNetwork: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createNativeStackNavigator<StackParamList>();

const FeedStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Listing" component={Feed} />
      <Stack.Screen name="AddNetwork" component={AddNetwork} />
    </Stack.Navigator>
  );
};

const FeedDrawerMenu = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Feed" component={FeedStackScreen} />
      <Drawer.Screen name="MyProfile" component={MyProfile} />
    </Drawer.Navigator>
  );
};

export default FeedDrawerMenu;
