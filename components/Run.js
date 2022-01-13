import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Monitor from "./Monitor";
import Pin from "./Pin";
import { distanceBetween } from "../constants/distanceBetween";

function Run({ latitude, longitude, distance }) {
  console.log("12", latitude);
  const [positionState, setPostion] = useState([]);
  const [distanceState, setDistance] = useState(0);
  const [paceState, setPace] = useState(0);
  const mapRef = useRef();
  const currentPosition =
    positionState.length === 0
      ? { coords: { latitude, longitude } }
      : positionState[positionState.length - 1];
  const onChangePosition = async () => {
    const options = { accuracy: 6, timeInterval: 1000, distanceInterval: 1 };
    const listener = await Location.watchPositionAsync(options, (position) => {
      mapRef &&
        mapRef.current &&
        mapRef.current.animateCamera(position.coords, 1000);
      const delta = distanceBetween(currentPosition, position);
      const distance = distanceState + delta;
      const pace = computePace(delta, currentPosition, position);
      const positionArr = [...positionState, position];

      setPostion(positionArr);
      setDistance(distance);
      setPace(pace);
      console.log("35", {
        positionState,
        currentPosition,
      });
    });

    return () => {
      listener.remove();
    };
  };

  useEffect(() => {
    onChangePosition();
  }, [positionState.length === 0]);

  const computePace = (delta, currentPosition, position) => {
    const time = position.timestamp - currentPosition.timestamp;
    const pace = delta ? time / delta : 0;
    console.log("54", pace);
    return pace;
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Monitor
        {...{
          distance: distanceState,
          pace: paceState ? paceState : 0,
          totalDistance: distance,
        }}
      />
      <MapView
        ref={mapRef}
        provider="google"
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        <Marker coordinate={currentPosition.coords} anchor={{ x: 0.5, y: 0.5 }}>
          <Pin />
        </Marker>
        <Polyline
          coordinates={positionState.map((position) => position.coords)}
          strokeWidth={10}
          strokeColor="#f2b659"
        />
      </MapView>
    </View>
  );
}

export default Run;

const styles = StyleSheet.create({
  map: {
    flex: Platform.isPad ? 1 : 2,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
