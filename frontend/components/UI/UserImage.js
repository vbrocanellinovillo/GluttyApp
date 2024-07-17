import { StyleSheet, Pressable, Image } from "react-native";
import * as Haptics from "expo-haptics"

export default function UserImage({ image, onPress, dimensions }) {
  const borderRadius = dimensions / 2;

  function pressImageHandler() {
    Haptics.selectionAsync()
    onPress()
  }

  return (
    <Pressable
      onPress={pressImageHandler}
      style={({ pressed }) => (pressed ? styles.pressed : "")}
    >
      <Image
        source={{
          uri: image,
        }}
        style={[
          styles.userImage,
          { width: dimensions, height: dimensions, borderRadius },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  userImage: {
    objectFit: "fill",
  },

  pressed: {
    opacity: 0.8,
  },
});
