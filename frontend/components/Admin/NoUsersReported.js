import { Image, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { thumbGlutty } from "../../constants/glutty";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { useRefresh } from "../../hooks/useRefresh";

export default function NoUsersReported({ children, onRefresh }) {
  const { refreshing, handleRefresh } = useRefresh(onRefresh);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Image source={{ uri: thumbGlutty }} style={styles.image} />
      <TextCommonsMedium style={styles.text}>{children}</TextCommonsMedium>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
    paddingTop: 50,
    paddingHorizontal: 30,
  },

  image: {
    width: 180,
    height: 180,
    objectFit: "contain",
  },

  text: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
});
