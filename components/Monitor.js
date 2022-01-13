import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useInterval } from "../constants/ClockInterval";
import { formatDuration } from "../constants/FormatDuration";
import SemiCircleProgressBarCmp from "./SemiCircleProgressBar";

function Monitor({ distance, pace, totalDistance }) {
  const [duration, setDuration] = useState(0);

  useInterval(() => {
    setDuration(duration + 1);
  }, 1000);

  const ratio = distance / totalDistance;
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text>
          <SemiCircleProgressBarCmp ratio={ratio} />
        </Text>
        <Text style={{ ...styles.txt, position: "absolute" }}>
          Distance: {distance.toFixed(2)}
        </Text>
      </View>
      <View style={{ ...styles.row }}>
        <View style={styles.rowDirection}>
          <Feather
            style={styles.iconsStyle}
            name="watch"
            size={30}
            color="black"
          />
          <Text style={styles.txt}>{formatDuration(pace)}</Text>
        </View>
        <View style={styles.rowDirection}>
          <Feather
            style={styles.iconsStyle}
            name="clock"
            size={30}
            color="black"
          />
          <Text style={styles.txt}>{formatDuration(duration)}</Text>
        </View>
      </View>
    </View>
  );
}

export default Monitor;

const styles = StyleSheet.create({
  container: {
    flex: Platform.isPad ? 1 : 1.2,
    // height: 320,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  rowDirection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconsStyle: { paddingHorizontal: 5 },
  txt: { fontSize: 20, textAlign: "center" },
});
