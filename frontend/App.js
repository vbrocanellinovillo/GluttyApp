import { GestureHandlerRootView } from "react-native-gesture-handler";
import Index from "./Index";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./context/store";
import { PaperProvider } from "react-native-paper";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http";

export default function App() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider>
            <Index />
          </PaperProvider>
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
