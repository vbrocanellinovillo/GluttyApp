import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import TextCommonsMedium from "../../components/UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../../components/UI/FontsTexts/TextCommonsRegular";
import { Colors } from "../../constants/colors";
import { sendVerificationMail, verifyCode } from "../../services/userService";
import GluttyModal from "../../components/UI/GluttyModal";

export function EmailVerification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [emailSent, setEmailSent] = useState(false); // Estado para controlar si el correo ya fue enviado
  const route = useRoute();
  const { username, email } = route.params;
  const inputsRef = useRef([]); // Referencia para cada input
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!emailSent) {
      sendVerificationMail(username); // Enviar el correo de verificación
      setEmailSent(true); // Evitar que se vuelva a enviar
    }
  }, [emailSent, email]);

  // Temporizador
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)); // Resta 1 segundo cada vez
    }, 1000);

    return () => clearInterval(timer); // Limpia el temporizador cuando el componente se desmonte
  }, []);

  const closeModalHandler = () => {
    setShowModal(false);
  };

  // Convierte el tiempo en formato mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`; // Si los segundos son menores a 10, agrega un 0 delante
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

  const resendCode = () => {
    setMessage("Se ha enviado el codigo a: " + email);
    setShowModal(true);
    sendVerificationMail(username); // Sólo reenviar si el temporizador ha terminado
    setTimeLeft(300); // Reiniciar el temporizador a 5 minutos
  };

  const verifyCodeIngresado = () => {
    console.log("Código ingresado:", code.join(""));

    const verificar = verifyCode(username, code.join(""));
    console.log(verificar);
    setMessage("Ha ingresado correctamente el código de verificación");
    setShowModal(true);
    navigation.navigate("Login");
  };

  return (
    <>
      <View style={styles.container}>
        <TextCommonsMedium style={styles.title}>
          Verificación de Email
        </TextCommonsMedium>
        <TextCommonsRegular style={styles.subtitle}>
          Se ha enviado un email al correo electrónico ingresado:{" "}
          <TextCommonsRegular style={styles.email}>{email}</TextCommonsRegular>
        </TextCommonsRegular>

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

        {/* Mostrar tiempo restante */}
        <TextCommonsRegular style={styles.timerText}>
          Expira en: {formatTime(timeLeft)}
        </TextCommonsRegular>

        {/* Reenviar Código */}
        <TouchableOpacity onPress={resendCode}>
          <Text style={styles.resendText}>
            ¿No recibiste el código o expiró?{" "}
            <Text style={styles.resendLink}>Reenviar</Text>
          </Text>
        </TouchableOpacity>

        {/* Botón de Verificar */}
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={verifyCodeIngresado}
        >
          <TextCommonsRegular style={styles.verifyButtonText}>
            Verificar cuenta
          </TextCommonsRegular>
        </TouchableOpacity>
      </View>
      <GluttyModal
        message={message}
        visible={showModal}
        isError={false}
        onClose={closeModalHandler}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    padding: 20,
    backgroundColor: Colors.vainilla,
    //justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    //textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
  },
  email: {
    fontWeight: "bold",
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.muted,
    textAlign: "center",
    fontSize: 24,
    borderRadius: 10,
  },
  timerText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: Colors.mJordan, // Cambia a tu color primario
  },
  resendText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 30,
  },
  resendLink: {
    color: Colors.oceanBlue,
    fontWeight: "bold",
  },
  verifyButton: {
    backgroundColor: Colors.mJordan,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
