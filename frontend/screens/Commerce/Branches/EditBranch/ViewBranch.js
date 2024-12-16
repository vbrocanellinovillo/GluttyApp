import { useSelector } from "react-redux";
import { deleteBranch, getBranch } from "../../../../services/commerceService";
import { useState, useEffect } from "react";
import { Colors } from "../../../../constants/colors";
import { Button, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import TextCommonsRegular from "../../../../components/UI/FontsTexts/TextCommonsRegular";
import { ConsultAddress } from "../../../../components/Branch/EditBranch/ConsultAddress";
import { ConsultGeneralInfo } from "../../../../components/Branch/EditBranch/ConsultGeneralInfo";
import { ConsultPhotos } from "../../../../components/Branch/EditBranch/ConsultPhotos";
import ViewBranchSkeleton from "../../../../components/UI/Loading/ViewBranchSkeleton";
import ErrorViewBranch from "../../../../components/Branch/ErrorViewBranch";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import GluttyModal from "../../../../components/UI/GluttyModal";

export function ViewBranch({ route }) {
  const [branch, setBranch] = useState(undefined);
  const [isloading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [errorMessage, setMessage] = useState(false);
  const [modalExito, setModalExito] = useState(false);

  const id = route.params.branch.id;
  const token = useSelector((state) => state.auth.accessToken);
  const onDelete = route.params.onDelete;
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const cargarBranch = async () => {
        try {
          setIsLoading(true);
          const branchData = await getBranch(id, token); // Espera la promesa con await
          setBranch(branchData);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
  
      if (id && token) {
        cargarBranch();
      }
    }, [id, token]) // Dependencias
  );
  
//console.log("le branch:")
//console.log(branch)

const handleDeleteBranch = async () => {
  try {
    //setIsLoading(true);
    await deleteBranch(id, token);
    setMessage("La sucursal fue eliminada con éxito");
    setModalExito(true);
    onDelete && onDelete(id);

  } catch (error) {
    setIsError(true);
    setMessage(error.message || "Error desconocido"); // Maneja errores también
    setModalExito(true);
    //console.log(error.message);
  } finally {
    //setIsLoading(false);
  }
  setShowEliminarModal(false);
}

  function closeModalDeleteHandler(){
    setShowEliminarModal(false)
  }

  function closeModalHandler() {
    setModalExito(false);
    //onDelete(id)
    navigation.goBack();
  }


  if (isloading) {
    return <ViewBranchSkeleton />;
  }

  if (!isloading && error) {
    return <ErrorViewBranch />
  }

  return (
    <>
      {branch && (
        <>
          <TextCommonsRegular style={styles.title}>
            Datos de Sucursal
          </TextCommonsRegular>
          <ScrollView style={styles.scrollview}>
            <ConsultGeneralInfo branch={branch} />
            <ConsultAddress branch={branch} />
            <ConsultPhotos branch={branch} />
          

          <TouchableOpacity style={styles.deleteButtonContainer}>
            <Button
              title="Eliminar Sucursal"
              color="white"
              onPress={() => setShowEliminarModal(true)}
            />
          </TouchableOpacity>
          </ScrollView>

          <GluttyModal
            visible={showEliminarModal}
            onClose={closeModalDeleteHandler}
            message="¿Seguro que desea eliminar la sucursal?"
            other
            buttons={[
            {
              text: "Confirmar",
              bg: "green",
              color: Colors.whiteGreen,
              onPress: () => handleDeleteBranch(branch.id)
            },
            ]}
            closeButtonText="Cancelar"
          />
          <GluttyModal
            isError={error}
            message={errorMessage}
            onClose={closeModalHandler}
            visible={modalExito}
          />

        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    paddingBottom: 150,
    marginBottom: 70,
  },

  title: {
    marginTop: 20,
    marginLeft: 25,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.locro,
  },

  deleteButtonContainer: {
    backgroundColor: "red", // Naranja similar al mostrado
    borderRadius: 30, // Esquinas redondeadas
    //paddingVertical: 10, // Espaciado vertical
    paddingHorizontal: 20, // Espaciado horizontal
    alignItems: "center", // Centrar el texto
    justifyContent: "center",
    width: 200,
    height: 50,
    marginTop:30,
    marginLeft: 100,
    fontSize: 10,
    marginBottom:35,
  },
});
