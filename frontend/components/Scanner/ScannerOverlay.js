import { View, StyleSheet } from "react-native";
import Borders from "../../components/Scanner/Borders";
import ScannedProduct from "./ScannedProduct";

export default function ScannerOverlay({ scannedProduct, color, isLoading }) {
  return (
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
          <ScannedProduct isLoading={isLoading} product={scannedProduct} />
          <View style={styles.sideOverlay} />
        </View>
        <View style={styles.bottomBottomOverlay} />
      </View>
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
    flex: 2.2,
  },

  topBottomOverlay: {
    flex: 0.3,
    backgroundColor: overlayColor,
  },

  middleBottomOverlay: {
    flexDirection: "row",
  },

  bottomBottomOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
  },
});
