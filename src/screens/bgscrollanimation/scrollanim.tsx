import React, { useCallback, useRef } from "react";
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CARDS_DATA, ALT_CARDS_DATA } from "data";
import {
  BgImageLoopAnimation,
  BottomSheet,
  BottomSheetRefProps,
} from "components";

export const ScrollAnimationBgPlayGround = () => {
  const ref = useRef<BottomSheetRefProps>(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-300);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="rgba(0,0,0,0)"
        translucent={true}
      />
      <BgImageLoopAnimation
        images={CARDS_DATA}
        direction="left"
        useNativeDriver={true}
        opacity={0.7}
        speed={40}
      />
      <BgImageLoopAnimation
        images={ALT_CARDS_DATA}
        direction="right"
        useNativeDriver={true}
        opacity={0.7}
        speed={40}
      />

      <TouchableOpacity onPress={onPress}>
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Open Bottom Sheet
        </Text>
      </TouchableOpacity>

      <BottomSheet ref={ref}>
        {/* <ScrollView style={{ backgroundColor: "grey", }}>
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              height: 100,
              // borderWidth: 1,
              textAlignVertical: 'center'
            }}>
            Open Bottom Sheet
          </Text>
        </ScrollView> */}
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    // paddingHorizontal: 20,
    backgroundColor: "#171819",
  },
});
