import { StyleSheet } from "react-native";
import React, { useState } from "react";
import Animated, { useAnimatedGestureHandler, useSharedValue, withSpring } from "react-native-reanimated";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Color, { COLOR_CONTAINER_WIDTH } from "./Color";
import { snapPoint } from "./utils";
import Background from "./Background";

const colors = [
  { id: 0, start: "#00E0D3", end: "#00B4D4" },
  { id: 1, start: "#00B4D4", end: "#409CAE" },
  { id: 2, start: "#66D8A4", end: "#409CAE" },
  { id: 3, start: "#FC727B", end: "#F468A0" },
  { id: 4, start: "#8289EA", end: "#7A6FC1" },
  { id: 5, start: "#FEC7A3", end: "#FD9F9C" },
];

const snapPoints = colors.map((_, i) => (-i + 1) * COLOR_CONTAINER_WIDTH);

const ColorSelectorApp = () => {
  const translateX = useSharedValue(COLOR_CONTAINER_WIDTH);
  const [colorSelection, setColorSelection] = useState({
    position: { x: 0, y: 0 },
    previous: colors[0],
    current: colors[0],
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: (e, ctx) => {
      translateX.value = ctx.x + e.translationX;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(dest);
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.container}>
          <Background colorSelection={colorSelection} />
          {colors.map((color, index) => (
            <Color
              color={color}
              key={index}
              index={index}
              translateX={translateX}
              onPressed={position => {
                translateX.value = withSpring((-index + 1) * COLOR_CONTAINER_WIDTH);
                setColorSelection({ position, previous: colorSelection.current, current: color });
              }}
            />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ColorSelectorApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
