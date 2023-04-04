import { View, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import ColorPicker from "./ColorPicker";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const COLORS = [
  "red",
  "purple",
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "black",
  "white",
];
const BACKGROUND_COLOR = "rgba(0,0,0,0.9)";
const BIG_CIRCLE_SIZE = 250;

const ColorPickerApp = () => {
  const pickedColor = useSharedValue(COLORS[0]);
  const rBigCircleStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });

  const onColorChanged = useCallback((color) => {
    "worklet";
    pickedColor.value = color;
  }, []);

  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View
          style={[styles.bigCircle, rBigCircleStyle]}
        ></Animated.View>
      </View>
      <View style={styles.bottomContainer}>
        <ColorPicker
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          onColorChanged={onColorChanged}
        />
      </View>
    </>
  );
};

export default ColorPickerApp;

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  bigCircle: {
    width: BIG_CIRCLE_SIZE,
    height: BIG_CIRCLE_SIZE,
    borderRadius: BIG_CIRCLE_SIZE / 2,
  },
});
