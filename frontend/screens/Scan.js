import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [color, setColor] = useState("white");

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function scanCodeBar(scanningResult) {
    console.log(scanningResult.data);
    setColor("#66eb3d");
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
      />
      <View style={styles.codeScanner}>
        <CameraView
          facing="back"
          style={styles.codeCamera}
          onBarcodeScanned={scanCodeBar}
        >
          <View
            style={[
              styles.dimensions,
              styles.borderTopLeft,
              { borderColor: color },
            ]}
          />
          <View
            style={[
              styles.dimensions,
              styles.borderTopRight,
              { borderColor: color },
            ]}
          />
          <View
            style={[
              styles.dimensions,
              styles.borderBottomLeft,
              { borderColor: color },
            ]}
          />
          <View
            style={[
              styles.dimensions,
              styles.borderBottomRight,
              { borderColor: color },
            ]}
          />
        </CameraView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  camera: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.6,
  },

  codeScanner: {
    height: 300,
    width: 300,
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
  },

  codeCamera: {
    width: "100%",
    height: "100%",
  },

  dimensions: {
    position: "absolute",
    width: 120,
    height: 120,
  },

  borderTopLeft: {
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 20,
    left: 0,
  },

  borderTopRight: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopRightRadius: 20,
    right: 0,
  },

  borderBottomLeft: {
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderBottomLeftRadius: 20,
    left: 0,
    bottom: 0,
  },

  borderBottomRight: {
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 20,
    right: 0,
    bottom: 0,
  },
});
