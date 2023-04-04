import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const PICKER_WIDTH = 300;
const CIRCLE_PICKER_SIZE = 45;
const INTERNAL_CIRCLE_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;

const ColorPicker = ({ colors, start, end, onColorChanged }) => {
  const centerTranslateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (e, context) => {
      // context.x = centerTranslateX.value;
      centerTranslateX.value = withTiming(e.x);
      translateY.value = withTiming(-CIRCLE_PICKER_SIZE - 10);
      scale.value = withTiming(1.1);
    },
    onActive: (e, context) => {
      centerTranslateX.value = Math.min(Math.max(0, e.x), PICKER_WIDTH);
    },
    onFinish: () => {
      translateY.value = withTiming(0);
      scale.value = withTiming(1);
    },
  });

  const rCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: centerTranslateX.value - CIRCLE_PICKER_SIZE / 2 },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  const rInternalPickerStyle = useAnimatedStyle(() => {
    const inputRange = colors.map(
      (_, index) => (index / (colors.length - 1)) * PICKER_WIDTH
    );

    const backgroundColor = interpolateColor(
      centerTranslateX.value,
      inputRange,
      colors
    );
    onColorChanged(backgroundColor);

    return { backgroundColor };
  });

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={{ justifyContent: "center" }}>
          <LinearGradient {...{ colors, start, end }} style={styles.gradient} />
          <Animated.View style={[styles.circlePicker, rCircleStyle]}>
            <Animated.View
              style={[styles.circlePickerInternal, rInternalPickerStyle]}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: 40,
    width: PICKER_WIDTH,
    borderRadius: 22,
  },
  circlePicker: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  circlePickerInternal: {
    width: INTERNAL_CIRCLE_PICKER_SIZE,
    height: INTERNAL_CIRCLE_PICKER_SIZE,
    borderRadius: INTERNAL_CIRCLE_PICKER_SIZE / 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
  },
});

export default ColorPicker;
