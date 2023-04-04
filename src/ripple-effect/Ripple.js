import { Text, View } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Ripple = ({ style, onTap, children }) => {
  const touchX = useSharedValue(0);
  const touchY = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const containerWidth = useSharedValue(0);
  const containerHeight = useSharedValue(0);
  const animRef = useAnimatedRef();

  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: (e) => {
      const layout = measure(animRef);
      containerWidth.value = layout.width;
      containerHeight.value = layout.height;
      touchX.value = e.x;
      touchY.value = e.y;
      scale.value = 0;
      opacity.value = 1;
      scale.value = withTiming(1, { duration: 1000 });
      opacity.value = withTiming(0, { duration: 1000 });
    },
    onActive: () => {
      if (onTap) runOnJS(onTap)();
    },
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const radius = Math.sqrt(
      containerWidth.value ** 2 + containerHeight.value ** 2
    );
    return {
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.2)",
      opacity: opacity.value,
      transform: [
        { translateX: touchX.value - radius },
        { translateY: touchY.value - radius },
        { scale: scale.value },
      ],
    };
  });

  return (
    <Animated.View ref={animRef}>
      <GestureHandlerRootView>
        <TapGestureHandler onGestureEvent={tapGestureEvent}>
          <Animated.View style={[style, { overflow: "hidden" }]}>
            {children}
            <Animated.View style={rCircleStyle} />
          </Animated.View>
        </TapGestureHandler>
      </GestureHandlerRootView>
    </Animated.View>
  );
};

export default Ripple;
