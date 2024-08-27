import { ImageBackground, StyleSheet, View, Image } from "react-native";
import { superMarketGlutty } from "../../constants/glutty";
import { Colors } from "../../constants/colors";
import Button from "../../components/UI/Controls/Button";
import TextCommonsRegular from "../../components/UI/FontsTexts/TextCommonsRegular";

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
        <TextCommonsRegular style={styles.title}>Comencemos...</TextCommonsRegular>
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
        <TextCommonsRegular style={styles.textoDeAbajo}>O inicia sesión con</TextCommonsRegular>
        
        <View styles={styles.containerGoogle}>
        <Image
          source={{uri: "https://res.cloudinary.com/dksmkvi49/image/upload/v1724718349/2504739_1_ap6rwq.webp" }}
          style={styles.imageGoogle}
        />
        </View>
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
    width: 410,
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
    marginTop: 25
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
  
});
