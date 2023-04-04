import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SwipeButton from "./SwipeButton";

const SwipeButtonApp = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SwipeButton />
    </View>
  );
};

export default SwipeButtonApp;

const styles = StyleSheet.create({});
