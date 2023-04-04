import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import BottomSheet from "./BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

const BottomSheetApp = () => {
  const bottomSheetRef = useRef();
  const onPress = () => {
    bottomSheetRef.current.openBottomSheet();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />

      <View
        style={{
          flex: 1,
          backgroundColor: "#111",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            height: 50,
            borderRadius: 25,
            aspectRatio: 1,
            backgroundColor: "white",
            opacity: 0.6,
          }}
          onPress={onPress}
        />
        <BottomSheet ref={bottomSheetRef}>
          <View style={{ flex: 1 }}>
            <Text>Hello..</Text>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default BottomSheetApp;
