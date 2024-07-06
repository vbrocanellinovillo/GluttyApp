import { StyleSheet, Pressable, Image } from "react-native";

export default function UserImage({ image, onPress, dimensions }) {
  const borderRadius = dimensions / 2;

  return (
    <Pressable
      onPress={onPress}
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
