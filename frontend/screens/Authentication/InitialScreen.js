import { StyleSheet, View, Image } from "react-native";
import { Colors } from "../../constants/colors";
import Button from "../../components/UI/Controls/Button";
import TextCommonsRegular from "../../components/UI/FontsTexts/TextCommonsRegular";
import { LinearGradient } from "expo-linear-gradient";
import TextCommonsMedium from "../../components/UI/FontsTexts/TextCommonsMedium";
import { gluttyTitulo } from "../../constants/glutty";

export default function InitialScreen({ navigation }) {
  function login() {
    navigation.navigate("Login");
  }

  function register() {
    navigation.navigate("Register");
  }

  return (
    <LinearGradient
      colors={[Colors.locro, Colors.humita]}
      style={styles.container}
      start={{ x: 1, y: 0.75 }}
      end={{ x: 0, y: 0.25 }}
    >
      {/*<TextCommonsMedium style={styles.gluttyText}>Glutty.</TextCommonsMedium>*/}
      <Image
      source={{uri: gluttyTitulo}}
      style={styles.gluttyImage}
      ></Image>
      <View style={styles.options}>
        <TextCommonsRegular style={styles.title}>
          Comencemos...
        </TextCommonsRegular>
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
        <TextCommonsRegular style={styles.textoDeAbajo}>
          O inicia sesión con
        </TextCommonsRegular>

        <View styles={styles.containerGoogle}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dksmkvi49/image/upload/v1724718349/2504739_1_ap6rwq.webp",
            }}
            style={styles.imageGoogle}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  image: {
    flex: 0.9,
    width: 410,
  },

  gluttyText: {
    fontSize: 80,
    color: Colors.mJordan,
    marginTop: 100,
    marginLeft: 30,
    fontWeight: "800",
  },

  options: {
    backgroundColor: Colors.locro,
    borderRadius: 30,
    bottom: 0,
    width: "100%",
    height: 300,
    justifyContent: "center",
    paddingHorizontal: 50,
    paddingBottom: 50,
    gap: 10,
  },

  button: {
    borderRadius: 20,
  },

  buttonText: {
    fontWeight: "400",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.pielcita,
    textAlign: "left",
    letterSpacing: 0.5,
    marginTop: 25,
  },
  textoDeAbajo: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.pielcita,
    textAlign: "center",
    letterSpacing: 0.5,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 30,
    width: "80%",
  },
  imageGoogle: {
    width: 35,
    height: 35,
    alignSelf: "center", // Centra la imagen horizontalmente
    backgroundColor: "white",
    borderRadius: 17.5, // Ajusta el borde redondeado, debe ser la mitad de la altura para un círculo perfecto
    borderWidth: 3, // Ancho del borde
    borderColor: "#FFFFFF", // Color blanco para el borde
    overflow: "hidden", // Asegura que la imagen respete el borde redondeado
    resizeMode: "contain",
    marginTop: -17,
  },
  gluttyImage:{
    marginTop: 90,
    marginLeft: 15,
    width: 300,
    height: 100,
    objectFit: "contain",
  },
});
