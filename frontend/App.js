import { GestureHandlerRootView } from "react-native-gesture-handler";
import Index from "./Index";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "./context/store";

export default function App() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <Index />
      </Provider>
    </GestureHandlerRootView>
  );
}
