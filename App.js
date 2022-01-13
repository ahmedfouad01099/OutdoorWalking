import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
  LogBox,
} from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import Run from "./components/Run";
export default function App() {
  const [appState, setAppState] = useState({
    ready: false,
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    LogBox.ignoreAllLogs();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return alert("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});

      setAppState({
        ready: true,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  if (!appState.ready) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={"white"} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={"default"}
        />
        <Run
          distance={1000}
          {...{ latitude: appState.latitude, longitude: appState.longitude }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#29252b",
    alignItems: "center",
    justifyContent: "center",
  },
});
