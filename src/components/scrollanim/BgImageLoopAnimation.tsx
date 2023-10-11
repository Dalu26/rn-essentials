import React, { useEffect, FC, useRef } from "react";
import {
  Animated,
  Image,
  Dimensions,
  Easing,
  ViewStyle,
  ImageRequireSource,
  ImageComponent,
} from "react-native";

interface ViewProps {
  direction: string;
  style?: ViewStyle;
  speed: number;
  images: ImageRequireSource[];
  useNativeDriver: boolean | false;
  opacity?: number;
}

type localElement = {
  width: number | string;
  height: number | string;
  image: ImageComponent | number;
  currentKey: string | number;
};

export const BgImageLoopAnimation: FC<ViewProps> = ({
  direction,
  style,
  speed,
  images,
  useNativeDriver,
  opacity,
}) => {
  const WIDTH = Dimensions.get("window").width;
  const HEIGHT = Dimensions.get("window").height;
  let imageComponents: ImageComponent[] = []; // Store all image components to dynamiclly add
  let widthOfAllImages = 0; // Store sum of width of scaled images
  let widthOfAllImagesUnscaled = 0; // Store sum of width of unscaled images
  let counter = 0; // Counter to use as a key
  let deviceWidth = WIDTH;
  images.forEach(image => {
    // Loop over each image passed in through props
    const { width, height } = Image.resolveAssetSource(image);

    let localElement: localElement = {}; // Create object for current image information
    let currentKey = "image" + counter.toString();
    localElement.width = 95;
    localElement.height = 130;
    localElement.image = image;
    localElement.currentKey = currentKey;
    imageComponents.push(localElement);
    widthOfAllImages = widthOfAllImages + localElement.width;
    widthOfAllImagesUnscaled = widthOfAllImagesUnscaled + width;
    counter++;
  });

  let timesToDuplicate = Math.ceil(deviceWidth / widthOfAllImages); // Find out how many times we need to duplicate the image components we already created in order to fill the screen by the time the scrolling animations finishes
  for (let i = 0; i < timesToDuplicate + 1; i++) {
    images.forEach(image => {
      let localElement: localElement = {};
      let currentKey = "image" + counter.toString();
      localElement.width = 95;
      localElement.height = 130;
      localElement.image = image;
      localElement.currentKey = currentKey;
      widthOfAllImages = widthOfAllImages + localElement.width;
      imageComponents.push(localElement);
      counter++;
    });
  }

  let topPositionAnimated = useRef(new Animated.Value(0)).current; // Top y translation starts at 0

  let ready = true;

  // Set the rotation
  let rotation = "0deg";
  switch (direction) {
    case "right":
      topPositionAnimated = useRef(new Animated.Value(-1 * widthOfAllImages)).current; // Left x translation starts at 0
      rotation = "0deg";
      break;

    case "left":
      rotation = "-360deg";
      break;
    default:
      break;
  }

  useEffect(() => {
    runAnimation();
  }, []);

  const runAnimation = () => {
    if (direction == "left") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(topPositionAnimated, {
            toValue: -1 * widthOfAllImages,
            duration: speed * widthOfAllImagesUnscaled,
            delay: 0,
            easing: Easing.linear,
            useNativeDriver: useNativeDriver,
          }),
          Animated.timing(topPositionAnimated, {
            toValue: 0,
            duration: 0,
            delay: 0,
            easing: Easing.linear,
            useNativeDriver: useNativeDriver,
          }),
        ]),
      ).start(() => runAnimation());
    }
    if (direction == "right") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(topPositionAnimated, {
            toValue: 0,
            duration: speed * widthOfAllImagesUnscaled,
            delay: 0,
            easing: Easing.linear,
            useNativeDriver: useNativeDriver,
          }),
          Animated.timing(topPositionAnimated, {
            toValue: -1 * widthOfAllImages,
            duration: 0,
            delay: 0,
            easing: Easing.linear,
            useNativeDriver: useNativeDriver,
          }),
        ]),
      ).start(() => runAnimation());
    }
  };

  if (!ready) return null;
  let elements = [];
  for (imageComponent of imageComponents) {
    elements.push(
      <Image
        key={imageComponent.currentKey}
        source={imageComponent.image}
        style={{
          width: 95,
          height: 130,
          resizeMode: "stretch",
          marginHorizontal: 5,
        }}
      />,
    );
  }

  let translationObject = {};
  let width = "100%";
  let height = "100%";
  switch (direction) {
    case "left":
      translationObject.translateX = topPositionAnimated;
      width = (100 * HEIGHT) / WIDTH + "%";
      height = (100 * WIDTH) / HEIGHT + "%";
      break;

    case "right":
      translationObject.translateX = topPositionAnimated;
      width =
        (100 * Dimensions.get("window").height) /
          Dimensions.get("window").width +
        "%";
      height =
        (100 * Dimensions.get("window").width) /
          Dimensions.get("window").height +
        "%";
      break;
    default:
      translationObject.translateY = topPositionAnimated;
      break;
  }
  return (
    <Animated.View
      style={{
        width: width,
        // height: height,
        transform: [
          translationObject,
          {
            rotate: rotation,
          },
        ],
        flexDirection: "row",
        opacity,
        alignItems: "center",
        marginVertical: 5
      }}>
      {elements}
    </Animated.View>
  );
};
