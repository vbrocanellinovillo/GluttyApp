import { Pressable, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import UserResult from "./UserResult";
import TagResult from "./TagResult";

export default function SearchResult({
  onPress,
  containerStyle,
  textStyle,
  iconStyle,
  icon = "search-outline",
  imageStyle,
  userContainerStyle,
  result,
}) {
  function handlePress() {
    Haptics.selectionAsync();
    onPress && onPress(result);
  }

  const value = result?.result;

  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.container, styles.pressed, containerStyle]
          : [styles.container, containerStyle]
      }
      onPress={handlePress}
    >
      {result?.isUser ? (
        <UserResult
          textStyle={textStyle}
          containerStyle={userContainerStyle}
          imageStyle={imageStyle}
          user={value}
        />
      ) : (
        <TagResult
          iconStyle={iconStyle}
          icon={icon}
          textStyle={textStyle}
          tag={value}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  pressed: {
    opacity: 0.7,
  },
});
