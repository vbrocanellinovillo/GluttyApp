import { FlatList } from "react-native-gesture-handler";
import Message from "./Message";
import { StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";

const INSET_BOTTOM = 50;

export default function Messages({
  messages = [],
  isLoading,
  isError,
  isTyping,
  handleFinishTyping,
  focusedInput,
}) {
  if (!messages) return;

  useEffect(() => {
    if (!focusedInput) {

      listRef.current.scrollToOffset({
        offset: contentHeight + INSET_BOTTOM * 100,
        animated: true,
      });
    }
  }, [focusedInput]);

  const [contentHeight, setContentHeight] = useState(0);

  const listRef = useRef();

  function adjustSize() {
    if (listRef.current) {
      listRef.current.scrollToOffset({
        offset: contentHeight + INSET_BOTTOM,
        animated: true,
      });
    }
  }

  return (
    <View style={styles.overallContainer}>
      <FlatList
        ref={listRef}
        contentContainerStyle={styles.container}
        data={messages}
        renderItem={({ item, index }) => (
          <Message
            message={item}
            isLoading={isLoading && index === messages.length - 1}
            isError={isError && index === messages.length - 1}
            isTyping={index === messages.length - 1 ? isTyping : 0}
            handleFinishTyping={handleFinishTyping}
          />
        )}
        contentInset={{ bottom: INSET_BOTTOM }}
        onContentSizeChange={(width, height) => {
          setContentHeight(height);
          adjustSize();
        }}
        onLayout={() => listRef?.current?.scrollToEnd({ animated: true })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overallContainer: {
    flex: 1,
    paddingBottom: INSET_BOTTOM * 0.1,
  },

  container: {
    paddingLeft: 28,
    paddingRight: 12,
    gap: 6,
  },
});
