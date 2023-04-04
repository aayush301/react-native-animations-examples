import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ripple from "./Ripple";

const RippleEffectApp = () => {
  return (
    <View style={styles.container}>
      <Ripple style={styles.ripple} onTap={() => console.log("Tapped")}>
        <Text style={{ fontSize: 25 }}>Tap</Text>
      </Ripple>
    </View>
  );
};

export default RippleEffectApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ripple: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 30,
    elevation: 2,
  },
});
