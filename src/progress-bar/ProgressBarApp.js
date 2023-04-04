import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);
const BACKGROUND_COLOR = "#444B6F";
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#A6E1FA";

const { width, height } = Dimensions.get("window");
const CIRCLE_LENGTH = 1000;
const RADIUS = CIRCLE_LENGTH / (2 * Math.PI);

const ProgressBarApp = () => {
  const progress = useSharedValue(0);
  const strokeAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const textAnimatedProps = useAnimatedProps(() => ({
    text: `${Math.floor(progress.value * 100)}`,
  }));

  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedText
        style={styles.progressText}
        animatedProps={textAnimatedProps}
      />
      <Svg style={{ position: "absolute" }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={RADIUS}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={RADIUS}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={strokeAnimatedProps}
          strokeLinecap="round"
        />
      </Svg>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProgressBarApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 80,
    color: "rgba(254,254,254,0.7)",
  },
  button: {
    bottom: 80,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    letterSpacing: 2.0,
  },
});
