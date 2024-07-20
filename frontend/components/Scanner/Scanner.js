import { CameraView } from "expo-camera";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import ScannerOverlay from "./ScannerOverlay";

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
        <ScannerOverlay color={color} />
      </CameraView>
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
    flex: 1,
    width: "100%",
  },
});
