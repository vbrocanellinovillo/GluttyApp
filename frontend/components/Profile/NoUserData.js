import { StyleSheet } from "react-native";
import GluttyErrorScreen from "../UI/GluttyErrorScreen";

export default function NoUserData() {
  return (
    <GluttyErrorScreen width={300} height={300} style={styles.container}>
      Hubo un error al recuperar los datos del usuario. Por favor intente de
      nuevo mas tarde
    </GluttyErrorScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 140,
  },
});
