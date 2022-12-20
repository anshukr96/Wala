import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddNetwork from '../../screens/AddNetwork/AddNetwork';
import FAQ from '../../screens/FAQ/FAQ';
import Feed from '../../screens/Feed/Feed.screen';
import Feedback from '../../screens/Feedback/Feedback';
import CreateListings from '../../screens/Listings/CreateListings/CreateListings';
import ExistingListings from '../../screens/Listings/ExistingListings/ExistingListings';
import EditProfile from '../../screens/MyProfile/EditProfile.screen';
import MyProfile from '../../screens/MyProfile/MyProfile.screen';
import Signout from '../../screens/SignOut/Signout';

export type DrawerParamList = {
  ['My Listing']: undefined;
  MyProfile: undefined;
  AddNetwork: undefined;
  FAQ: undefined;
  Feedback: undefined;
  SignOut: undefined;
};

export type StackParamList = {
  Listing: undefined;
  AddNetwork: undefined;
  CreateListings: undefined;
  ExistingListing: undefined;
  EditProfile: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createNativeStackNavigator<StackParamList>();

const FeedStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Listing" component={Feed} />
      <Stack.Screen name="AddNetwork" component={AddNetwork} />
      <Stack.Screen name="CreateListings" component={CreateListings} />
      <Stack.Screen name="ExistingListing" component={ExistingListings} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

const FeedDrawerMenu = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: 'white',
        drawerStyle: {
          backgroundColor: '#90EE90',
        },
      }}>
      <Drawer.Screen name="My Listing" component={FeedStackScreen} />
      <Drawer.Screen name="MyProfile" component={MyProfile} />
      <Drawer.Screen name="FAQ" component={FAQ} />
      <Drawer.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen name="SignOut" component={Signout} />
    </Drawer.Navigator>
  );
};

export default FeedDrawerMenu;
