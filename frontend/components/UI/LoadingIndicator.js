import { ActivityIndicator } from "react-native";
import ScreenCenter from "./ScreenCenter";

export default function LoadingIndicator({ color, size }) {
  return (
    <ScreenCenter>
      <ActivityIndicator color={color} size={size} />
    </ScreenCenter>
  );
}
