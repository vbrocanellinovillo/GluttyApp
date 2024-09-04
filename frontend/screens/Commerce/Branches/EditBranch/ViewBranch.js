import { useSelector } from "react-redux";
import { ConsultGeneralInfo } from "./ConsultGeneralInfo";
import { getBranch } from "../../../../services/commerceService";
import { useState, useEffect } from "react";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../../../constants/colors";
import { Alert, ScrollView, StyleSheet } from "react-native";
import TextCommonsRegular from "../../../../components/UI/FontsTexts/TextCommonsRegular";
import { ConsultAddress } from "./ConsultAddress";
import { ConsultPhotos } from "./ConsultPhotos";

export function ViewBranch({ route }) {
  const [branch, setBranch] = useState(undefined);
  const [isloading, setIsLoading] = useState(false);

  const id = route.params.branch.id;
  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const cargarBranch = async () => {
      try {

        setIsLoading(true);
        const branchData = await getBranch(id, token);  // Espera la promesa con await
        setBranch(branchData);

      } catch (error) {
        console.error('Error caught in catch block:', error);
        Alert.alert('Error al cargar la branch seleccionada', error.message);
      } finally {
        setIsLoading(false);
      }
    }; 
    if (id && token) {  
      cargarBranch();
    }
  }, [id, token]);

  return (
    <>
    <LoadingGlutty visible={isloading} />
    {branch ? (
      <><TextCommonsRegular style={styles.title}>Datos de Sucursal</TextCommonsRegular><ScrollView style={styles.scrollview}>
          <ConsultGeneralInfo branch={branch} />
          <ConsultAddress branch={branch} />
          <ConsultPhotos branch={branch} />
        </ScrollView></>

    ) : (
      ""
    )}
  </>
  )
}

const styles = StyleSheet.create({
  scrollview: {
    paddingBottom: 200,
    marginBottom: 110,
  },
  title: {
    marginTop: 20,
    marginLeft: 25,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.locro,
  },
})
