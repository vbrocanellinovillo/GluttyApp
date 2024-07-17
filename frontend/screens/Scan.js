import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
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

  const innerCamera = (
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
  );

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanCodeBar}
      >
        <View style={styles.overlay}>
          <View style={styles.topOverlay} />
          <View style={styles.middleOverlay}>
            <View style={styles.sideOverlay} />
            <View
              style={{
                overflow: "hidden",
              }}
            >
              <View style={[styles.focusedArea]}>
                <View
                  style={[
                    styles.corner,
                    styles.topLeft,
                    { borderColor: color },
                  ]}
                />
                <View
                  style={[
                    styles.corner,
                    styles.topRight,
                    { borderColor: color },
                  ]}
                />
                <View
                  style={[
                    styles.corner,
                    styles.bottomLeft,
                    { borderColor: color },
                  ]}
                />
                <View
                  style={[
                    styles.corner,
                    styles.bottomRight,
                    { borderColor: color },
                  ]}
                />
              </View>
            </View>
            <View style={styles.sideOverlay} />
          </View>
          <View style={styles.bottomOverlay} />
        </View>
      </CameraView>
    </View>
  );
}

const overlayColor = "rgba(0, 0, 0, 0.5)";
const position = -5;
const borderWidth = 7;
const borderRadius = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  camera: {
    flex: 1,
    width: "100%",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  topOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
  },

  middleOverlay: {
    height: 300,
    flexDirection: "row",
  },

  sideOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
  },

  focusedArea: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },

  bottomOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
  },

  corner: {
    position: "absolute",
    width: 100,
    height: 100,
  },

  topLeft: {
    borderTopWidth: borderWidth,
    borderLeftWidth: borderWidth,
    borderTopLeftRadius: borderRadius,
    top: position,
    left: position,
  },

  topRight: {
    borderTopWidth: borderWidth,
    borderRightWidth: borderWidth,
    borderTopRightRadius: borderRadius,
    top: position,
    right: position,
  },

  bottomLeft: {
    borderBottomWidth: borderWidth,
    borderLeftWidth: borderWidth,
    borderBottomLeftRadius: borderRadius,
    bottom: position,
    left: position,
  },

  bottomRight: {
    borderBottomWidth: borderWidth,
    borderRightWidth: borderWidth,
    borderBottomRightRadius: borderRadius,
    bottom: position,
    right: position,
  },
});
