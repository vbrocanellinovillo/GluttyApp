import { GestureHandlerRootView } from "react-native-gesture-handler";
import Index from "./Index";
import "react-native-reanimated";

export default function App() {
  return (
    <GestureHandlerRootView>
      <Index />
    </GestureHandlerRootView>
  );
}
