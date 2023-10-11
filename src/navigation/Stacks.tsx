import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTabBar from "./Tab";

import { ScrollAnimationBgPlayGround } from "screens/bgscrollanimation";
import { SectionListPlayGround } from "screens/sectionlist";

const { Navigator, Screen } = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Navigator
      initialRouteName="sectionList"
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        lazy: true,
        headerShown: false,
        unmountOnBlur: true,
      }}>

        <Screen name="sectionList" component={SectionListPlayGround} />
        <Screen name="bgloopAnimation" component={ScrollAnimationBgPlayGround} />
      </Navigator>
  );
};


const Stack = createStackNavigator();

