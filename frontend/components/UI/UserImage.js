import { StyleSheet, Pressable, Image } from "react-native";
import * as Haptics from "expo-haptics";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

export default function UserImage({ onPress, dimensions }) {
  const borderRadius = dimensions / 2;
  //const image =
  //  "https://pbs.twimg.com/profile_images/1605246082144997381/2H9mNjaD_400x400.jpg";
  const image = useSelector((state) => state.auth.userData.image);

  function pressImageHandler() {
    Haptics.selectionAsync();
    onPress();
  }

  return (
    <Pressable
      onPress={pressImageHandler}
      style={({ pressed }) => (pressed ? styles.pressed : "")}
    >
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          style={[
            styles.userImage,
            { width: dimensions, height: dimensions, borderRadius },
          ]}
        />
      ) : (
        <Ionicons
          name="person-circle-outline"
          size={dimensions}
          color={Colors.mJordan}
        />
      )}
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
