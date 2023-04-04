import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const RADIUS = 45;
const { width, height } = Dimensions.get("window");
const MAX_RADIUS = Math.SQRT2 * Math.max(width, height);

const Background = ({ colorSelection }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 400 });
  }, [colorSelection]);

  const rStyle = useAnimatedStyle(() => {
    return {
      top: -RADIUS + colorSelection.position.y,
      left: -RADIUS + colorSelection.position.x,
      borderRadius: RADIUS,
      width: RADIUS * 2,
      height: RADIUS * 2,
      transform: [{ scale: progress.value * (MAX_RADIUS / RADIUS) }],
    };
  });

  return (
    <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: colorSelection.previous.start }}>
      <Animated.View style={rStyle}>
        <LinearGradient
          colors={[colorSelection.current.start, colorSelection.current.end]}
          style={{ width: "100%", height: "100%", borderRadius: RADIUS }}
        />
      </Animated.View>
    </View>
  );
};

export default Background;
