import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  View,
} from "react-native";
import ScreenCenter from "./ScreenCenter";

export default function LoadingIndicator({ color, size }) {
  return (
    <ScreenCenter>
      <ActivityIndicator color={color} size={size} />
    </ScreenCenter>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 150,
  },

  image: {
    width: 300,
    height: 800,
    objectFit: "contain",
  },

  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
