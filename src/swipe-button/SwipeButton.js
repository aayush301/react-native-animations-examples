import { View, StyleSheet } from "react-native";
import React from "react";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const BUTTON_WIDTH = 250;
const BUTTON_HEIGHT = 70;
const BUTTON_PADDING = 10;
const CIRCLE_WIDTH = BUTTON_HEIGHT - 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - CIRCLE_WIDTH;

const SwipeButton = () => {
  const translateX = useSharedValue(0);
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.translateX = translateX.value;
    },
    onActive: (e, ctx) => {
      translateX.value = ctx.translateX + e.translationX;
    },
    onEnd: e => {
      if (translateX.value < BUTTON_WIDTH / 2 - CIRCLE_WIDTH) translateX.value = withSpring(0);
      else translateX.value = withTiming(H_SWIPE_RANGE);
    },
  });

  const inputRange = [0, H_SWIPE_RANGE];
  const animatedStyles = {
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
        backgroundColor: interpolateColor(translateX.value, inputRange, ["#06d6a0", "#fff"]),
      };
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(translateX.value, inputRange, [0.8, 0], Extrapolate.CLAMP),
        transform: [
          {
            translateX: interpolate(
              translateX.value,
              inputRange,
              [0, BUTTON_WIDTH / 2 - CIRCLE_WIDTH],
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    }),
    colorWave: useAnimatedStyle(() => {
      return {
        width: CIRCLE_WIDTH + 2 * BUTTON_PADDING + translateX.value,
        opacity: interpolate(translateX.value, inputRange, [0, 1]),
      };
    }),
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.swipeContainer}>
        <AnimatedLinearGradient
          colors={["#06d6a0", "#1b9aaa"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.colorWave, animatedStyles.colorWave]}
        />
        <Animated.Text style={[styles.swipeText, animatedStyles.swipeText]}>Swipe Me</Animated.Text>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.swipeable, animatedStyles.swipeable]} />
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

export default SwipeButton;

const styles = StyleSheet.create({
  swipeContainer: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    padding: BUTTON_PADDING,
    backgroundColor: "#eee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BUTTON_HEIGHT / 2,
  },
  swipeable: {
    height: CIRCLE_WIDTH,
    width: CIRCLE_WIDTH,
    borderRadius: CIRCLE_WIDTH / 2,
    position: "absolute",
    left: BUTTON_PADDING,
  },
  swipeText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#1b9aaa",
  },

  colorWave: {
    position: "absolute",
    left: 0,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT / 2,
  },
});
