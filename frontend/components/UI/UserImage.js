import { StyleSheet, Pressable, Image } from "react-native";

export default function UserImage({ image, onPress, width, height }) {
  const borderRadius = width / 2;

  return (
    <Pressable onPress={onPress}>
      <Image
        source={{
          uri: image,
        }}
        style={[styles.userImage, { width, height, borderRadius }]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  userImage: {
    objectFit: "fill",
  },
});
