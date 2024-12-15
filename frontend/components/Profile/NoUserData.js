import { StyleSheet } from "react-native";
import GluttyErrorScreen from "../UI/GluttyErrorScreen";

export default function NoUserData({ onRefresh }) {
  return (
    <GluttyErrorScreen
      width={200}
      height={200}
      style={styles.container}
      onRefresh={onRefresh}
    >
      Ocurrio un error. Por favor intente de nuevo mas tarde
    </GluttyErrorScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 140,
  },
});
