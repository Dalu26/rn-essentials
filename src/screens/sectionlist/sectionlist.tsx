import React, { useRef, useState } from "react";
import {
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
  Text,
  StatusBar,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SECTION_LIST_DATA } from "data";
import { sectionListGetItemLayout } from "libs";

export const SectionListPlayGround = () => {
  const listRef = useRef<SectionList>(null);
  const chipListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [chipPressed, setChipPressed] = useState<boolean>(false);

  const getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => 38,
    getSectionHeaderHeight: () => 44,
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0] && !viewableItems[0].index && !chipPressed) {
      const index = viewableItems[0].section.index;
      if (index !== activeIndex) {
        setActiveIndex(index);
        if (chipListRef?.current) {
          chipListRef.current.scrollToIndex({
            animated: true,
            index: SECTION_LIST_DATA[index].index,
            viewPosition: 0.5,
          });
        }
      }
    }
  };

  const onScrollToIndexFailed = () => {
    if (chipListRef?.current) {
      chipListRef.current.scrollToIndex({
        animated: true,
        index: 0,
        viewPosition: 0,
      });
    }

    if (listRef?.current) {
      listRef.current.scrollToLocation({
        animated: true,
        itemIndex: 0,
        sectionIndex: 0,
        viewPosition: 0,
      });
    }
  };

  const renderItem = ({ item }: { item: string }) => {
    return <Text style={styles.dish}>{item}</Text>;
  };

  const scrollToListItem = (index: number) => {
    setActiveIndex(index);
    setChipPressed(true);

    if (listRef?.current) {
      listRef.current.scrollToLocation({
        animated: true,
        itemIndex: 0,
        sectionIndex: index,
        viewPosition: 0,
      });
    }
    if (chipListRef?.current) {
      chipListRef.current.scrollToIndex({
        animated: true,
        index: index,
        viewPosition: 0.5,
      });
    }

    setTimeout(() => {
      setChipPressed(false);
    }, 300);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="rgba(0,0,0,0)"
        translucent={true}
      />
      <FlatList
        data={SECTION_LIST_DATA}
        ref={chipListRef}
        style={styles.chipList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        bounces={false}
        initialNumToRender={10}
        renderItem={({ item, index }) => {
          const { title } = item;
          const isActiveItem = activeIndex === index;
          return (
            <Pressable
              onPress={() => scrollToListItem(index)}
              style={{
                ...styles.chip,
                backgroundColor: isActiveItem ? "#e2725b" : "transparent",
                borderColor: isActiveItem
                  ? "transparent"
                  : "rgba(226,114,91,0.2)",
              }}
              key={title}>
              <Text style={styles.chipText}>{title}</Text>
            </Pressable>
          );
        }}
      />
      <SectionList
        sections={SECTION_LIST_DATA}
        ref={listRef}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => {
          return <Text style={styles.sectionHeader}>{title}</Text>;
        }}
        onScrollToIndexFailed={() => onScrollToIndexFailed()}
        showsVerticalScrollIndicator={false}
        bounces={false}
        stickySectionHeadersEnabled={false}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        getItemLayout={getItemLayout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#171819",
  },
  dish: {
    fontSize: 18,
    fontFamily: "CircularStd-Bold",
    backgroundColor: "#e2725b",
    marginBottom: 20,
    paddingVertical: 10,
    paddingLeft: 10,
    color: "#fff",
  },
  sectionHeader: {
    fontSize: 24,
    fontFamily: "CircularStd-Bold",
    marginBottom: 20,
    backgroundColor: "#171819",
    color: "#fff",
  },
  chipList: {
    marginBottom: 20,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 20,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
  },
  chipText: {
    fontSize: 20,
    fontFamily: "CircularStd-Bold",
    lineHeight: 24,
    color: "#fff",
  },
});
