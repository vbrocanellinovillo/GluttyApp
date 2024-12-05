import { useEffect, useRef, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { forgotPasswordCode } from "../../services/userService"; // Asegúrate de que la función correcta está importada
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../constants/colors"; // Asegúrate de que Colors tenga los valores que deseas

export default function PasswordCodeVerification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const inputsRef = useRef([]);

  // Obtener el username desde los parámetros de la ruta (o desde el estado global)
  const route = useRoute();
  const { username } = route.params; // Asegúrate de que el username se pase como parámetro

  const resendCode = async () => {
    Haptics.selectionAsync();
    setIsResending(true);
    try {
      await forgotPassword(username); // Sólo reenviar si el temporizador ha terminado
      setTimeLeft(300); // Reiniciar el temporizador a 5 minutos
      setIsError(false);
      setMessage("Se ha enviado el codigo a: " + email);
      setShowModal(true);
    } catch (error) {
      setIsError(true);
      setMessage("Ocurrio un error. Por favor intente nuevamente");
      setShowModal(true);
    } finally {
      setIsResending(false);
    }
  };

  const handleCodeInput = (index, value) => {
    let newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Mover el foco al siguiente input si el valor es válido y no es el último
    if (value && index < code.length - 1) {
      inputsRef.current[index + 1].focus();
    }

    // Si el valor está vacío y no es el primero, regresar al anterior
    if (!value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  async function handleSubmit() {
    const codeString = code.join(""); // Convertir el código a string
    if (!codeString.trim()) {
      setError("Por favor, ingrese el código.");
      return;
    }

    try {
      setIsLoading(true);
      //await forgotPasswordCode(username, code.join("")); // Asegúrate de que se llama a la función correcta
      Alert.alert("Éxito", "Código verificado correctamente.");
      navigation.navigate("SetNewPassword"); // Navega a la pantalla para establecer nueva contraseña
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "El código no es válido. Intente nuevamente.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <LoadingGlutty visible={isLoading} color={Colors.vainilla} />
      <Text style={styles.title}>Verificar Código</Text>
      <Text style={styles.description}>
        Ingresa el código que enviamos a tu correo para continuar con el cambio de contraseña.
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Input de Código */}
      <View style={styles.codeInputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputsRef.current[index] = el)} // Referencia a cada input
            style={styles.codeInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleCodeInput(index, value)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Verificar Código</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resendCode}>
        <Text style={styles.resendText}>¿No recibiste el código? Envíalo de nuevo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background, // Asegúrate de que Colors.background tenga el color deseado
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.primary, // Cambia según tus colores
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: Colors.text, // Cambia según tus colores
    paddingHorizontal: 10,
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  codeInput: {
    width: 50, // Ancho fijo para que parezca un cuadro
    height: 50, // Alto fijo para que parezca un cuadro
    borderWidth: 2, // Grosor del borde
    borderColor: Colors.lightGray, // Cambia según tus colores
    borderRadius: 10,
    textAlign: "center",
    fontSize: 24, // Aumentar el tamaño de la fuente para mejor legibilidad
    backgroundColor: Colors.inputBackground || "white", // Cambia según tus colores
  },
  error: {
    color: Colors.error, // Cambia según tus colores
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.primary, // Cambia según tus colores
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginVertical: 10,
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  resendText: {
    color: Colors.primary, // Cambia según tus colores
    fontSize: 14,
    textDecorationLine: "underline",
    marginTop: 10,
  },
});
