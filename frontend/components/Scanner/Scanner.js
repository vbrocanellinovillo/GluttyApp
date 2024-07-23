import { CameraView } from "expo-camera";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ScannerOverlay from "./ScannerOverlay";

export default function Scanner({ onScan, scannedProduct, isLoading }) {
  const [color, setColor] = useState("white");
  const [ean, setEan] = useState(undefined);

  async function scanCodeBar(scanningResult) {
    const scannedEan = scanningResult.data;
    if (ean && ean === scannedEan) return;

    setColor("#66eb3d");
    setEan(scannedEan);
    await onScan(scannedEan);
    setColor("white");
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["ean13", "ean8"] }}
        onBarcodeScanned={scanCodeBar}
      >
        <ScannerOverlay
          color={color}
          isLoading={isLoading}
          scannedProduct={scannedProduct}
        />
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
