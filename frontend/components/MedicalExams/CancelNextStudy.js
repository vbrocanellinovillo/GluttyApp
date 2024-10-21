import DialogContainer from "../UI/DialogContainer";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { StyleSheet, View } from "react-native";
import Button from "../UI/Controls/Button";
import { convertDate } from "../../utils/dateFunctions";
import { Colors } from "../../constants/colors";
import { useSelector } from "react-redux";
import { useState } from "react";
import { cancelDateNextExam } from "../../services/medicalExamService";
import LoadingGlutty from "../UI/Loading/LoadingGlutty";

export default function CancelNextStudy({
  onDismiss,
  time,
  showModal,
}) {
  const token = useSelector((state) => state.auth?.accessToken);

  const [isLoading, setIsLoading] = useState(false);

  async function cancelSchedule() {
    console.log("por que aca");

    setIsLoading(true);
    try {
      onDismiss();
      await cancelDateNextExam(token);
      showModal("Recordatorio eliminado correctamente");
    } catch (error) {
      showModal("Ocurrio un error. Por favor intente de nuevo más tarde", true);
    } finally {
      setIsLoading(false);
    }
  }

  const dateToString = convertDate(time);

  return (
    <>
      <DialogContainer onDismiss={onDismiss} containerStyle={styles.container}>
        <TextCommonsMedium style={styles.reminder}>
          Próximo recordatorio: {"\n"} {dateToString}
        </TextCommonsMedium>
        <TextCommonsMedium style={styles.title}>
          ¿Deseas cancelarlo?
        </TextCommonsMedium>
        <View style={styles.buttonContainer}>
          <Button
            style={[styles.actionButton, styles.keepButton]}
            onPress={onDismiss}
          >
            <TextCommonsMedium style={styles.buttonText}>
              Mantener recordatorio
            </TextCommonsMedium>
          </Button>
          <Button
            style={[styles.actionButton, styles.cancelButton]}
            onPress={cancelSchedule}
            textStyle={styles.buttonText}
          >
            Borrarlo
          </Button>
        </View>
      </DialogContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "500",
    color: Colors.mJordan,
    textAlign: "center",
    marginBottom: -40,
  },

  reminder: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.mJordan,
    textAlign: "center",
    marginBottom: 10,
  },

  buttonContainer: {
    //flexDirection: 'row',
    justifyContent: "center",
    marginTop: 60,
  },

  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    margin: 5,
  },

  keepButton: {
    backgroundColor: "#f4a261",
    //marginRight:20
  },

  cancelButton: {
    backgroundColor: "#e76f51",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
