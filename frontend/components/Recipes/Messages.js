import { FlatList } from "react-native-gesture-handler";
import Message from "./Message";
import { StyleSheet } from "react-native";

export default function Messages({ messages = [], isLoading, isError }) {
  if (!messages) return;

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={messages}
      renderItem={({ item, index }) => (
        <Message
          message={item}
          isLoading={isLoading && index === messages.length - 1}
          isError={isError && index === messages.length - 1}
        />
      )}
      contentInset={{ bottom: 50 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 28,
    paddingRight: 12,
    gap: 6,
  },
});
