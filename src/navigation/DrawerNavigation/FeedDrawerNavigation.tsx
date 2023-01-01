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
  Home: undefined;
  ['My Profile']: undefined;
  ['My Listing']: undefined;
  AddNetwork: undefined;
  FAQ: undefined;
  Feedback: undefined;
  ['Sign Out']: undefined;
};

export type StackParamList = {
  Feeds: undefined;
  AddNetwork: undefined;
  CreateListings: undefined;
  ['My Listing']: undefined;
  EditProfile: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createNativeStackNavigator<StackParamList>();

const FeedStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feeds" component={Feed} />
      <Stack.Screen name="AddNetwork" component={AddNetwork} />
      <Stack.Screen name="CreateListings" component={CreateListings} />
      <Stack.Screen name="My Listing" component={ExistingListings} />
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
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen name="Home" component={FeedStackScreen} />
      <Drawer.Screen name="My Listing" component={ExistingListings} />
      <Drawer.Screen name="My Profile" component={MyProfile} />
      <Drawer.Screen name="FAQ" component={FAQ} />
      <Drawer.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen name="Sign Out" component={Signout} />
    </Drawer.Navigator>
  );
};

export default FeedDrawerMenu;
