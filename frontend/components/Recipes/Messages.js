import { FlatList } from "react-native-gesture-handler";
import Message from "./Message";
import { View } from "react-native";

export default function Messages({ messages, isLoading, isError }) {
  if (!messages) return;

  return (
    <View style={{ paddingLeft: 28, paddingRight: 12, gap: 20 }}>
      <Message />
      <Message isAnswer />
    </View>
  );
}
