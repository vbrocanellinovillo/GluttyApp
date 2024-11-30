import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Image } from "react-native";
import { gluttyChef } from "../../constants/glutty";
import Animated, { FadeIn } from "react-native-reanimated";
import MessageContent from "./MessageContent";
import Sender from "./Sender";
import TriangleResponse from "./TriangleResponse";
import TimeText from "./TimeText";
import { saveMessage } from "../../services/chatbotService";
import { useSelector } from "react-redux";
import { useState } from "react";
import GluttyModal from "../UI/GluttyModal";
import LoadingGlutty from "../UI/Loading/LoadingGlutty";

export default function Message({
  message,
  isLoading,
  isError,
  isTyping,
  handleFinishTyping,
}) {
  const token = useSelector((state) => state.auth?.accessToken);

  const isAnswer = message?.isAnswer;

  const [isLoadingSave, setIsLoadingSave] = useState(false); // Estado para el botón guardar
  const [modalVisible, setModalVisible] = useState(false); // Control del modal
  const [modalMessage, setModalMessage] = useState(""); // Mensaje del modal
  const [isErrorModal, setIsErrorModal] = useState(false); // Error en el modal

  async function handleSave() {
    try {
      setIsLoadingSave(true);
      await saveMessage(message?.id, message?.content, token);
      setModalMessage("Mensaje guardado correctamente.");
      setIsErrorModal(false);
      setModalVisible(true); // Mostrar el modal tras éxito
      setIsLoadingSave(false)
    } catch (error) {
      setModalMessage(`Error al guardar: ${error.message}`);
      setIsErrorModal(true);
      setModalVisible(true); // Mostrar el modal en caso de error
    } finally {
      setIsLoadingSave(false);
    }
  }

  return (
    <>
      <Animated.View
        style={{ alignItems: isAnswer ? "stretch" : "flex-end" }}
        entering={FadeIn}
      >
        <Sender isAnswer={isAnswer} />
        <View style={[styles.container, { width: isAnswer ? "90%" : "70%" }]}>
          <MessageContent
            isLoading={isLoading}
            isError={isError}
            isAnswer={isAnswer}
            typing={isTyping}
            handleFinishTyping={handleFinishTyping}
            onSave={handleSave}
            //isLoadingSave={isLoadingSave} // Pasar el estado del botón guardar
          >
            {message?.content}
          </MessageContent>
          <TriangleResponse isAnswer={isAnswer} />
        </View>

        <TimeText isAnswer={isAnswer}>{message?.time}</TimeText>

        {isAnswer && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: gluttyChef }} style={styles.image} />
          </View>
        )}
      </Animated.View>

      {/* Modal para el estado del guardado */}
      <LoadingGlutty visible={isLoadingSave}></LoadingGlutty>
      <GluttyModal
        visible={modalVisible}
        isError={isErrorModal}
        message={modalMessage}
        onClose={() => setModalVisible(false)} // Cerrar el modal
        closeButton={true}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.roca,
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 30,
    position: "relative",
    paddingBottom: 40,
    shadowColor: "#444",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },

  imageContainer: {
    position: "absolute",
    width: 65,
    height: 65,
    backgroundColor: "white",
    borderRadius: 35,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.oceanBlue,
    left: -25,
    bottom: -20,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});
