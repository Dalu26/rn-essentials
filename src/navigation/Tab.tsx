import React, { type PropsWithChildren, FC, ReactSVGElement } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { NavigationState } from "@react-navigation/native";
import { BlurView } from "@react-native-community/blur";
import { colors } from "../utils/colors";

import HomeIcon from "../assets/svgs/tab/shiga.svg";
import TransactionIcon from "../assets/svgs/tab/transaction.svg";
// import HistoryIcon from "../assets/svgs/tab/transactions.svg";
// import HistoryInactiveIcon from "../assets/svgs/tab/transactionInactive.svg";
// import SearchIcon from "../assets/svgs/tab/search.svg";

interface TabProps {
    state: NavigationState;
    navigation: NavigationState;
    descriptors: NavigationState;
}

const MyTabBar: FC<TabProps> = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const imagesObj = {
    sectionlist: {
      inActive: <HomeIcon fill={colors.greyText} />,
      isActive: <HomeIcon fill={colors.white} />,
    },
    bgloopanimation: {
      inActive: <TransactionIcon stroke={colors.greyText} />,
      isActive: <TransactionIcon stroke={colors.white} />,
    },
    // explore: {
    //   inActive: <SearchIcon fill={colors.greyText} />,
    //   isActive: <SearchIcon fill={colors.white} />,
    // },
    // transactions: {
    //   inActive: <HistoryInactiveIcon />,
    //   isActive: <HistoryIcon />,
    // },
  };

  const hapticFeedbackOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  return (
    <BlurView
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      blurType="light"
      blurAmount={10}
      blurRadius={25}
      overlayColor="transparent">
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            ReactNativeHapticFeedback.trigger(
              "impactLight",
              hapticFeedbackOptions,
            );
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <SingleTab
              images={imagesObj[label.toLowerCase()]}
              isFocused={isFocused}
              onPress={onPress}
              key={`TABS_${index}`}
            />
          );
        })}
      </View>
    </BlurView>
  );
};

interface imageProps {
  inActive: ReactSVGElement;
  isActive: ReactSVGElement;
}

const SingleTab: FC<
  PropsWithChildren<{
    images: imageProps;
    isFocused: boolean;
    onLongPress?: () => void;
    onPress: () => void;
  }>
> = ({ images, isFocused, onPress, onLongPress }) => {
  const { singleTabContainer } = styles;
  return (
    <Pressable
      onPress={onPress}
      hitSlop={30}
      style={singleTabContainer}
      onLongPress={onLongPress}>
      {isFocused ? images?.isActive : images?.inActive}
    </Pressable>
  );
};
// Tab with user initials
const SettingsTab: FC<
  PropsWithChildren<{
    accountHolder?: string;
    borderWidth?: number;
  }>
> = ({ accountHolder, borderWidth }) => {
  return (
    <View style={[styles.settingsTab, { borderWidth }]}>
      <Text style={styles.settingsText}>{accountHolder}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.background,
    height: 80,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
    paddingHorizontal: 30,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  singleTabContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: '#fff',
    flex: 1,
    height: '100%'
  },
  settingsTab: {
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.violet,
    borderWidth: 2,
    borderColor: "#fff",
  },
  settingsText: {
    color: colors.white,
    fontFamily: "CircularStd-Bold",
    textTransform: "uppercase",
    fontSize: 10,
  },
});
export default MyTabBar;
