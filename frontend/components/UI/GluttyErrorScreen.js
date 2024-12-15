import { StyleSheet, Image, ScrollView, RefreshControl } from "react-native";
import { mechanicGlutty } from "../../constants/glutty";
import TextCommonsMedium from "./FontsTexts/TextCommonsMedium";
import { useRefresh } from "../../hooks/useRefresh";
import { Colors } from "../../constants/colors";

export default function GluttyErrorScreen({
  width,
  height,
  children,
  textStyle,
  style,
  onRefresh,
}) {
  const { refreshing, handleRefresh } = useRefresh(onRefresh);

  return (
    <ScrollView
      contentContainerStyle={[styles.gluttyContainer, style]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Image
        source={{
          uri: mechanicGlutty,
        }}
        style={[styles.image, { width, height }, textStyle]}
      />
      <TextCommonsMedium style={[styles.text, textStyle]}>
        {children}
      </TextCommonsMedium>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gluttyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  image: {
    objectFit: "contain",
  },

  text: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 16,
    color: Colors.mJordan,
  },
});
