import { StyleSheet, View, Image, ScrollView } from "react-native";
import { thumbGlutty } from "../../constants/glutty";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import { Divider } from "react-native-paper";
import AditionalInfo from "./AditionalInfo";
import PhotosContainer from "./PhotosContainer";
import DetailsGeneralInfo from "./DetailsGeneralInfo";
import ErrorBranchDetails from "./ErrorBranchDetails";
import MenusContainer from "./MenusContainer";
import { useState } from "react";
import ContextualMenu from "../UI/contextualMenu";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { report } from "../../services/adminService";
import GluttyModal from "../UI/GluttyModal";
import { Portal } from "react-native-paper";
import { useSelector } from "react-redux";


export default function BranchDetails({ branch, handlePdf }) {

  const [showMenu, setShowMenu] = useState(false); // Estado para mostrar el menú contextual
  const [showReportModal, setShowReportModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.accessToken);


  //Const de modal
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");



  function handleReport() {
    setShowReportModal(true)
  }

  async function confirmModalReportHandler() {
    console.log("PORFISSS")
    try {
      console.log("perra")
      setIsLoading(true);
      console.log("comercio:", branch.commerce_username)

      const response = await report("USER", branch.commerce_username, token);
      console.log(response)
      setMessage("Tu reporte fue registrado con exito");
      setShowModal(true);
    } catch (error) {
      setIsError(true);
      setMessage(error.message || "Error desconocido"); // Maneja errores también
      setShowModal(true);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
    setShowReportModal(false);
  }

  function closeModalReportHandler(){
    setShowReportModal(false)
  }
  function closeModalHandler() {
    setShowModal(false);
  }

  if (!branch) return <ErrorBranchDetails />;

  return (
    <>
      <GluttyModal
        isError={isError}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
      />
    {/*CONFIRMAR REPORTE */}
    <Portal>
    <GluttyModal
      visible={showReportModal}
      onClose={closeModalReportHandler}
      message="¿Seguro que desea realizar el reporte?"
      other
      buttons={[
        {
          text: "Confirmar",
          bg: "green",
          color: Colors.whiteGreen,
          onPress: ()=>{confirmModalReportHandler()}
        },
      ]}
      closeButtonText="Cancelar"
      style = {styles.modal}
    />
    </Portal>
    <ScrollView
      contentContainerStyle={styles.branch}
      contentInset={{ bottom: 80 }}
    >
      <View style = {styles.puntos}>
      <TextCommonsMedium style={styles.commerceName}>
        {branch?.commerce_name}
      </TextCommonsMedium>

      {/*Tres puntos para reportar usuario */}
      <View style = {styles.options}>
            <TouchableOpacity onPress={() => {setShowMenu(!showMenu); console.log("Menu toggled:", !showMenu);}}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color={Colors.darkGray}
              />
            </TouchableOpacity>
            {showMenu&&(
              <ContextualMenu
                  isReportUser={true}
                  
                  onReportUser={handleReport}
              />
            )}
            </View>
      </View>
      
      <View style={styles.details}>
        <Divider />
        <DetailsGeneralInfo
          address={branch?.address}
          phone={branch?.phone}
          optionalPhone={branch?.optional_phone}
        />
        <Divider />
        <PhotosContainer photos={branch?.photos} />
        <MenusContainer menus={branch?.menus} handlePdf={handlePdf} />
        <Divider />
        <AditionalInfo
          onlyTakeAway={branch?.just_takeaway}
          separatedKitchen={branch?.separated_kitchen}
          description={branch?.commerce_description}
          schedule={branch?.schedules}
          isOpen={branch?.is_open_now}
        />
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  branch: {
    paddingHorizontal: 20,
    gap: 10,
  },

  commerceName: {
    textAlign: "center",
    fontSize: 26,
    color: Colors.mJordan,
  },
  options: {
    flexDirection: "row",
    //marginLeft: 50,
    //alignItems: "left",
    //width: "100%",
    marginTop: 7,
    //zIndex: 1500, // Asegura que el menú esté por delante
  },

  details: {
    marginTop: 10,
    gap: 14,
  },
  puntos:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
