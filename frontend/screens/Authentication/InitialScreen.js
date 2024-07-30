import { ImageBackground, StyleSheet, View } from "react-native";
import { superMarketGlutty } from "../../constants/glutty";
import { Colors } from "../../constants/colors";
import Button from "../../components/UI/Controls/Button";

export default function InitialScreen({ navigation }) {
  function login() {
    navigation.navigate("Login");
  }

  function register() {
    navigation.navigate("Register");
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: superMarketGlutty }}
        style={styles.image}
        resizeMode="stretch"
      ></ImageBackground>
      <View style={styles.options}>
        <Button
          backgroundColor="white"
          style={styles.button}
          textStyle={styles.buttonText}
          rightIcon="chevron-forward-outline"
          iconSize={22}
          onPress={register}
        >
          Soy nuevo en Glutty
        </Button>
        <Button
          backgroundColor="white"
          style={styles.button}
          textStyle={styles.buttonText}
          rightIcon="chevron-forward-outline"
          iconSize={22}
          onPress={login}
        >
          Ya soy Glutty usuario
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 0.9,
  },

  options: {
    backgroundColor: Colors.locro,
    borderRadius: 30,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 300,
    justifyContent: "center",
    paddingHorizontal: 50,
    paddingBottom: 50,
    gap: 20,
  },

  button: {
    borderRadius: 20,
  },

  buttonText: {
    fontWeight: "300",
  },
});
