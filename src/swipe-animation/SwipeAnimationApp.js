import { View, Text, Dimensions } from "react-native";
import React from "react";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "./utils";
import ActionHint from "./ActionHint";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const HEIGHT = 80;
const snapPoints = [-SCREEN_WIDTH, -100, 0];

const SwipeAnimationApp = () => {
  const translateX = useSharedValue(0);
  const height = useSharedValue(HEIGHT);
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.translateX = translateX.value;
    },
    onActive: (e, ctx) => {
      translateX.value = Math.min(0, ctx.translateX + e.translationX);
    },
    onEnd: e => {
      const dest = snapPoint(translateX.value, e.velocityX, snapPoints);
      translateX.value = withTiming(dest, {}, () => {
        if (dest == -SCREEN_WIDTH) height.value = withTiming(10);
      });
    },
  });

  const animatedStyles = {
    itemWrapper: useAnimatedStyle(() => {
      return {
        height: height.value,
      };
    }),
    itemSwipe: useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    }),
  };

  return (
    <View style={{ marginTop: 150 }}>
      <GestureHandlerRootView>
        <Animated.View style={[{ backgroundColor: "#ccc" }, animatedStyles.itemWrapper]}>
          <ActionHint {...{ translateX, height }} />
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={animatedStyles.itemSwipe}>
              <Text style={{ height: "100%", backgroundColor: "#f5f5f5" }}>Swipe me to Delete..</Text>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </GestureHandlerRootView>
    </View>
  );
};

export default SwipeAnimationApp;
