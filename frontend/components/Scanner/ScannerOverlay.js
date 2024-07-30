import { View, StyleSheet } from "react-native";
import Borders from "../../components/Scanner/Borders";
import ScannedProduct from "./ScannedProduct";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function ScannerOverlay({
  scannedData,
  color,
  isLoading,
  error,
}) {
  const [contracted, setContracted] = useState(false);

  const height = useSharedValue(300);

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: withSpring(height.value, { damping: 18 }),
    };
  });

  useEffect(() => {
    setContracted(false);
  }, [isLoading]);

  useEffect(() => {
    if (contracted) {
      height.value = 240;
    } else {
      height.value = 300;
    }
  }, [contracted]);

  function toggleContracted() {
    setContracted(!contracted);
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.topOverlay} />
      <Animated.View style={[styles.middleOverlay, animatedHeight]}>
        <View style={styles.sideOverlay} />
        <View>
          <View
            style={{
              overflow: "hidden",
            }}
          >
            <View style={styles.focusedArea}>
              <Borders color={color} />
            </View>
          </View>
        </View>
        <View style={styles.sideOverlay} />
      </Animated.View>
      <View style={styles.bottomOverlay}>
        <View style={styles.topBottomOverlay} />
        <View style={styles.middleBottomOverlay}>
          <View style={styles.sideOverlay} />
          <ScannedProduct
            isLoading={isLoading}
            scannedData={scannedData}
            onExpand={toggleContracted}
            isContracted={contracted}
            error={error}
          />
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
    flexDirection: "row",
  },

  sideOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
  },

  focusedArea: {
    height: "100%",
    width: 300,
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
