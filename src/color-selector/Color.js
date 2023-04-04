import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
export const COLOR_CONTAINER_WIDTH = width / 3;
const radius = 45;

const Color = ({ color, index, translateX, onPressed }) => {
  const gestureHandler = useAnimatedGestureHandler({
    onActive: e => {
      runOnJS(onPressed)({ x: e.absoluteX, y: e.absoluteY });
    },
  });

  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      -COLOR_CONTAINER_WIDTH * index,
      -COLOR_CONTAINER_WIDTH * (index - 1),
      -COLOR_CONTAINER_WIDTH * (index - 2),
    ];
    const angle = interpolate(translateX.value, inputRange, [Math.PI, Math.PI / 2, 0], Extrapolate.CLAMP);
    const translateY = -100 * Math.cos(angle);
    const scale = 0.8 + 0.2 * Math.sin(angle);
    return {
      transform: [{ translateX: translateX.value }, { translateY }, { scale }],
    };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <TapGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View>
          <LinearGradient colors={[color.start, color.end]} style={styles.gradient} />
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
};

export default Color;

const styles = StyleSheet.create({
  container: {
    width: COLOR_CONTAINER_WIDTH,
    alignItems: "center",
  },
  gradient: {
    borderRadius: radius,
    width: radius * 2,
    height: radius * 2,
    borderWidth: 6,
    borderColor: "white",
  },
});
