import { View, Text, Dimensions, Image, FlatList } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  interpolateColors,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const Carousel = ({ images }) => {
  const scrollX = useSharedValue(0);

  const handleScroll = e => {
    "worklet";
    scrollX.value = e.nativeEvent.contentOffset.x;
  };

  return (
    <View style={{ width: SCREEN_WIDTH }}>
      <FlatList
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scroll
        style={{ height: 300, backgroundColor: "#eee" }}
        data={images}
        renderItem={({ item: image, index }) => (
          <Image
            key={index}
            source={{ uri: image.src, width: SCREEN_WIDTH, height: "100%" }}
            resizeMode="cover"
          />
        )}
      />

      <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "center" }}>
        {images.map((_, idx) => {
          const animatedStyles = {
            dot: useAnimatedStyle(() => {
              const inputRange = [(idx - 1) * SCREEN_WIDTH, idx * SCREEN_WIDTH, (idx + 1) * SCREEN_WIDTH];
              const width = interpolate(scrollX.value, inputRange, [10, 30, 10], Extrapolate.CLAMP);
              const backgroundColor = interpolateColor(scrollX.value, inputRange, ["#ddd", "#00f", "#ddd"]);
              return { width, backgroundColor };
            }),
          };

          return (
            <Animated.View
              key={idx}
              style={[
                {
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 5,
                },
                animatedStyles.dot,
              ]}
            />
          );
        })}
      </View>

      <View></View>
    </View>
  );
};

export default Carousel;
