import { Image } from "react-native";
import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import { userGlutty } from "../../constants/glutty";

export default function UserResult({
  containerStyle,
  imageStyle,
  textStyle,
  user,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        source={{ uri: user?.profilePicture || userGlutty }}
        style={[styles.image, imageStyle]}
      />
      <TextCommonsMedium style={[styles.text, textStyle]}>
        {user?.name}
      </TextCommonsMedium>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    objectFit: "fill",
  },

  text: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.mJordan,
  },
});
