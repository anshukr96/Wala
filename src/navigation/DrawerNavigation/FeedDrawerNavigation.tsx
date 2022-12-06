import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Feed, { FeedHeader } from '../../screens/Feed/Feed.screen';
import MyProfile from '../../screens/MyProfile/Profile.screen';

export type DrawerParamList = {
  Feed: undefined;
  MyProfile: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const FeedDrawerMenu = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Feed"
        component={Feed}
        options={{
          headerTitle: '',
          headerRight: () => <FeedHeader />,
        }}
      />
      <Drawer.Screen name="MyProfile" component={MyProfile} />
    </Drawer.Navigator>
  );
};

export default FeedDrawerMenu;
