import { FlatList } from "react-native-gesture-handler";

export default function Messages({ messages, isLoading, isError }) {
  if (!messages) return;

  return <FlatList />;
}
