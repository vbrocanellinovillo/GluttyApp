import { useEffect, useRef, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
    forgotPassword,
    forgotPasswordCode
  } from "../../services/userService";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../constants/colors"; 
export default function PasswordCodeVerification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const inputsRef = useRef([]);

  
  const route = useRoute();
  const { username } = route.params; 

  const resendCode = async () => {
    Haptics.selectionAsync();
    setIsResending(true);
    try {
      await forgotPassword(username); 
      setTimeLeft(300); 
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

    console.log(code.join(""));

    try {
      setIsLoading(true);
      await forgotPasswordCode(username, code.join("")); 
      Alert.alert("Éxito", "Código verificado correctamente.");
      
      navigation.navigate("SetNewPassword", { username });                                                                       
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
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgb(211, 211, 211)", // Asegúrate de que Colors.background tenga el color deseado
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.primary, 
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: Colors.text, 
    paddingHorizontal: 10,
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  codeInput: {
    width: 50, 
    height: 50, 
    borderWidth: 2, 
    borderColor: Colors.lightGray, 
    borderRadius: 10,
    textAlign: "center",
    fontSize: 24, 
    backgroundColor: Colors.inputBackground || "white", 
  },
  error: {
    color: Colors.error, // Cambia según tus colores
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.locro, // Cambia según tus colores
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
