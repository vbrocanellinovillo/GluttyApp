import { CameraView } from "expo-camera";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Borders from "../../components/Scanner/Borders";
import ScannedProduct from "./ScannedProduct";

export default function Scanner({ onScan, scannedProduct }) {
  const [color, setColor] = useState("white");
  const [ean, setEanCode] = useState(undefined);

  function scanCodeBar(scanningResult) {
    const scannedEan = scanningResult.data;

    if (ean && ean != scannedEan) return;

    setEanCode(scannedEan);
    setColor("#66eb3d");
    onScan(scannedEan);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["ean13", "ean8"] }}
        onBarcodeScanned={scanCodeBar}
      >
        <View style={styles.overlay}>
          <View style={styles.topOverlay} />
          <View style={styles.middleOverlay}>
            <View style={styles.sideOverlay} />
            <View style={{ overflow: "hidden" }}>
              <View style={styles.focusedArea}>
                <Borders color={color} />
              </View>
            </View>
            <View style={styles.sideOverlay} />
          </View>
          <View style={styles.bottomOverlay}>
            <View style={styles.topBottomOverlay} />
            <View style={styles.middleBottomOverlay}>
              <View style={styles.sideOverlay} />
              <ScannedProduct />
              <View style={styles.sideOverlay} />
            </View>
            <View style={styles.bottomBottomOverlay} />
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const overlayColor = "rgba(0, 0, 0, 0.5)";

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
    flex: 2,
  },

  topBottomOverlay: {
    flex: 0.3,
    backgroundColor: overlayColor,
  },

  middleBottomOverlay: {
    flex: 4,
    flexDirection: "row",
  },

  bottomBottomOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
  },
});
