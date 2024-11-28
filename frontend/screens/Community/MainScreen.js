import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import GluttyFeedButton from "../../components/Community/GluttyFeedButton";
import InitialPosts from "../../components/Community/InitialPosts";
import Banners from "../../components/Community/Banners";

export default function MainScreen() {
  const isCommerce = useSelector((state) => state.auth?.isCommerce);

  return (
    <View style={styles.container}>
      {/* Mostrar banners solo si no es comercio */}
      {!isCommerce && <Banners />}
      <GluttyFeedButton />
      <InitialPosts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 34,
    gap: 30,
  },
});
