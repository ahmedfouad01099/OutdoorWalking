import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

function Pin() {
  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  });

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });
  return (
    <View style={styles.outerPin}>
      <View style={styles.pin}>
        <Animated.View style={[styles.innerPin, { transform: [{ scale }] }]} />
      </View>
    </View>
  );
}

export default Pin;

const styles = StyleSheet.create({
  outerPin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(242, 182, 89,.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  pin: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  innerPin: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "#f2b659",
    alignItems: "center",
    justifyContent: "center",
  },
});
