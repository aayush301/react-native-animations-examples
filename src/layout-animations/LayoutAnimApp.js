import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  Layout,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutLeft,
} from "react-native-reanimated";

const LIST_ITEM_COLOR = "#1798DE";
const LayoutAnimApp = () => {
  const [items, setItems] = useState(
    new Array(5).fill(0).map((_, id) => ({ id }))
  );
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  const onClickAdd = () => {
    setItems((currItems) => {
      const nextItemId = (currItems[currItems.length - 1]?.id ?? 0) + 1;
      return [...currItems, { id: nextItemId }];
    });
  };

  const deleteItem = (id) => {
    setItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 100 }}
      >
        {items.map((item, index) => (
          <Animated.View
            key={item.id}
            style={styles.listItem}
            onTouchEnd={() => deleteItem(item.id)}
            entering={
              isInitialRender.current ? SlideInDown.delay(index * 300) : FadeIn
            }
            layout={Layout.delay(100)}
            exiting={SlideOutLeft}
          >
            <Text
              style={{ textAlign: "center", color: "white", marginTop: 10 }}
            >
              {item.id}
            </Text>
          </Animated.View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={onClickAdd}>
        <Text style={{ color: "white", fontSize: 40 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LayoutAnimApp;

const styles = StyleSheet.create({
  listItem: {
    width: "90%",
    height: 65,
    backgroundColor: LIST_ITEM_COLOR,
    marginVertical: 10,
    borderRadius: 15,
    alignSelf: "center",
    elevation: 5,
  },
  floatingButton: {
    width: 60,
    aspectRatio: 1,
    position: "absolute",
    backgroundColor: "purple",
    borderRadius: 30,
    bottom: 20,
    right: "5%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    elevation: 0.1,
  },
});
