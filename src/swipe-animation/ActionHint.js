import { View, Dimensions } from "react-native";
import React from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ActionHint = ({ translateX, height }) => {
  const x = useDerivedValue(() => Math.abs(translateX.value));
  const animatedStyles = {
    container: useAnimatedStyle(() => {
      if (x.value < 100) {
        return { width: x.value, height: x.value, borderRadius: x.value / 2, backgroundColor: "red" };
      }
      const backgroundColor = interpolateColor(x.value, [100, SCREEN_WIDTH - 100], ["red", "#c00"]);
      return { width: x.value, height: "100%", borderRadius: 0, backgroundColor: backgroundColor };
    }),
    minus: useAnimatedStyle(() => {
      return { display: x.value < 100 ? "flex" : "none" };
    }),
    text: useAnimatedStyle(() => {
      return { display: x.value < 100 || x.value >= SCREEN_WIDTH ? "none" : "flex" };
    }),
  };

  const handleTap = () => {
    if (x.value !== 100) return;
    translateX.value = withTiming(-SCREEN_WIDTH, { duration: 100 }, () => {
      height.value = withTiming(10);
    });
  };

  return (
    <View
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <TapGestureHandler onActivated={handleTap}>
        <Animated.View style={[{ justifyContent: "center", alignItems: "center" }, animatedStyles.container]}>
          <Animated.View style={[{ width: 10, height: 5, backgroundColor: "white" }, animatedStyles.minus]} />
          <Animated.Text style={[{ fontSize: 20, color: "white" }, animatedStyles.text]}>
            Delete
          </Animated.Text>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

export default ActionHint;
