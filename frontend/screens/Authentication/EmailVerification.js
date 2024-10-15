import { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import TextCommonsMedium from "../../components/UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../../components/UI/FontsTexts/TextCommonsRegular";
import { Colors } from "../../constants/colors";
import {
  login,
  sendVerificationMail,
  verifyCode,
} from "../../services/userService";
import GluttyModal from "../../components/UI/GluttyModal";
import { useDispatch } from "react-redux";
import { authActions } from "../../context/auth";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import * as Haptics from "expo-haptics";
import { ActivityIndicator } from "react-native-paper";
import DismissKeyboardContainer from "../../components/UI/Forms/DismissKeyboadContainer";

export function EmailVerification({ navigation }) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [emailSent, setEmailSent] = useState(false); // Estado para controlar si el correo ya fue enviado
  const route = useRoute();
  const { username, email, password } = route.params;
  const inputsRef = useRef([]); // Referencia para cada input

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const [loginResponse, setLoginResponse] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!emailSent) {
      setEmailSent(true); // Evitar que se vuelva a enviar
      sendMail();
    }
  }, [emailSent, email]);

  const sendMail = async () => {
    try {
      sendVerificationMail(username); // Enviar el correo de verificación
    } catch (error) {
      setIsError(true);
      setMessage(
        "Ocurrio un error. Por favor intente ingresar el codigo más tarde"
      );
      setShowModal(true);
      navigation.navigate("Login");
    }
  };

  // Temporizador
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)); // Resta 1 segundo cada vez
    }, 1000);

    return () => clearInterval(timer); // Limpia el temporizador cuando el componente se desmonte
  }, []);

  const closeConfirmationModalHandler = () => {
    setShowConfirmationModal(false);
    dispatch(
      authActions.login({
        user: loginResponse.user,
        accessToken: loginResponse.access_token,
        refreshToken: loginResponse.refresh_token,
        image: loginResponse.profile_picture,
        isCommerce: loginResponse.is_commerce,
      })
    );
  };

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

  const resendCode = async () => {
    Haptics.selectionAsync();
    setIsResending(true);
    try {
      await sendVerificationMail(username); // Sólo reenviar si el temporizador ha terminado
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

  const verifyCodeIngresado = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsLoading(true);
    try {
      await verifyCode(username, code.join(""));
      const response = await login(username, password);
      setLoginResponse(response);
      setMessage("Ha ingresado correctamente el código de verificación");
      setShowConfirmationModal(true);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setMessage("Ocurrio un error con el codigo ingresado");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DismissKeyboardContainer>
        <View style={styles.container}>
          <TextCommonsMedium style={styles.title}>
            Verificación de Email
          </TextCommonsMedium>
          <TextCommonsRegular style={styles.subtitle}>
            Se ha enviado un email al correo electrónico ingresado:{" "}
            <TextCommonsRegular style={styles.email}>
              {email}
            </TextCommonsRegular>
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
          <View style={styles.resendContainer}>
            <TextCommonsMedium style={styles.resendText}>
              ¿No recibiste el código o expiró
            </TextCommonsMedium>
            <TouchableOpacity onPress={resendCode}>
              <TextCommonsRegular style={styles.resendLink}>
                {isResending ? (
                  <ActivityIndicator size="small" color={Colors.oceanBlue} />
                ) : (
                  "Reenviar"
                )}
              </TextCommonsRegular>
            </TouchableOpacity>
          </View>

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
      </DismissKeyboardContainer>
      <GluttyModal
        message="Codigo correcto ingresado. Puede cerrar para continuar en la aplicación!"
        visible={showConfirmationModal}
        isError={false}
        onClose={closeConfirmationModalHandler}
      />
      <GluttyModal
        visible={showModal}
        isError={isError}
        message={message}
        onClose={closeModalHandler}
      />
      <LoadingGlutty visible={isLoading} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    padding: 20,
    backgroundColor: Colors.vainilla,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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

  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
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
    color: Colors.whiteJordan,
    fontSize: 18,
    fontWeight: "bold",
  },
});
