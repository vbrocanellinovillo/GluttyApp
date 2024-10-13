import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextCommonsMedium from "./FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import { BlurView } from "expo-blur";

export default function BlurError({
  children,
  backdrop,
  style,
  intensity = 30,
  containerStyle,
  textStyle,
  iconStyle,
  text = "Ocurrio un error. Por favor intente de nuevo más tarde",
}) {
  return (
    <>
      {backdrop}
      <BlurView intensity={intensity} style={[styles.blurred, style]}>
        {children || (
          <View style={[styles.container, containerStyle]}>
            <Ionicons
              name="close-circle"
              size={34}
              color={Colors.redError}
              style={iconStyle}
            />
            <TextCommonsMedium style={[styles.text, textStyle]}>
              {text}
            </TextCommonsMedium>
          </View>
        )}
      </BlurView>
    </>
  );
}

const styles = StyleSheet.create({
  blurred: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },

  container: {
    container: {
      alignItems: "center",
      paddingHorizontal: 14,
      gap: 10,
    },

    text: {
      fontSize: 18,
      fontWeight: "400",
      color: Colors.mJordan,
      textAlign: "center",
    },
  },
});
