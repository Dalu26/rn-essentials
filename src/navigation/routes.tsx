import React, { useEffect, useRef } from "react";
import {
  View,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  createNavigationContainerRef,
  DarkTheme,
  useNavigation,
} from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { Tabs } from "./Stacks";

enableScreens();
export const navigationRef = createNavigationContainerRef();
const RootStack = createStackNavigator();

function App() {
  const navigation = useNavigation();
  const timerId = useRef<number>(0);
  const timeForInactivityInSecond = 60000;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (
        e: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        resetInactivityTimeout();
      },
    }),
  ).current;

  const resetInactivityTimeout = () => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      const currentRoute = navigation.getState()?.routes?.[0]?.name;

      // if (currentRoute === "") return;
    }, timeForInactivityInSecond);
  };

  useEffect(() => {
    resetInactivityTimeout();
  }, []);

  const { Navigator, Screen } = RootStack;

  return (
    <View {...panResponder.panHandlers} style={{ flex: 1 }}>
      <Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}>
        <Screen name="Tabs" component={Tabs} />
      </Navigator>
    </View>
  );
}

function Routes() {
  return (
    <NavigationContainer theme={DarkTheme} ref={navigationRef}>
      <App />
    </NavigationContainer>
  );
}

export default Routes;
