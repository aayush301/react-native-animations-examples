import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useCallback, useEffect, useImperativeHandle } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("screen");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 90;

const BottomSheet = React.forwardRef(({ children }, ref) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  useEffect(() => {
    translateY.value = withTiming(-80);
  }, []);

  const openBottomSheet = useCallback(() => {
    translateY.value = withTiming(MAX_TRANSLATE_Y);
  }, []);

  useImperativeHandle(ref, () => ({ openBottomSheet }), [openBottomSheet]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      const t = context.value.y + e.translationY;
      translateY.value = Math.max(t, MAX_TRANSLATE_Y);
    })
    .onEnd((e) => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        translateY.value = withTiming(-80);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        translateY.value = withTiming(MAX_TRANSLATE_Y);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );
    return { transform: [{ translateY: translateY.value }], borderRadius };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: "absolute",
    top: SCREEN_HEIGHT,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});
