/*import { useSelector } from "react-redux";
import { ConsultGeneralInfo } from "./ConsultGeneralInfo";
import { getBranch } from "../../../../services/commerceService";
import { useState, useEffect } from "react";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../../../constants/colors";


export function ViewBranch({route})  {
    const [branch, setBranch] = useState(undefined);
    const [isloading, setisloading] = useState(false);

    const id = route.params.branch.id;
    const token = useSelector((state) => state.auth.accessToken);
    
    useEffect(() => {
    const cargarBranch = () => {
      try {
        console.log('id', id);
        console.log('token', token);

        setisloading(true);
        branch = getBranch(id, token);
        setBranch(branch)
        console.log("branch:", branch)
        
      } catch (error) {
        Alert.alert('Error al cargar la branch seleccionada', error.message);
      } finally {
        setisloading(false);
      }
    };
    cargarBranch(); 
  }, [token]);

    return (
        <><LoadingGlutty visible={isloading} color={Colors.vainilla} />
        <ConsultGeneralInfo branch={branch}></ConsultGeneralInfo></>
    )
};*/

/*import { useSelector } from "react-redux";
import { ConsultGeneralInfo } from "./ConsultGeneralInfo";
import { getBranch } from "../../../../services/commerceService";
import { useState, useEffect } from "react";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../../../constants/colors";
import { Alert } from "react-native";

export function ViewBranch({ route }) {
  const [branch, setBranch] = useState(undefined);
  const [isloading, setIsLoading] = useState(false);

  const id = route.params.branch.id;
  const token = useSelector((state) => state.auth.accessToken);
  console.log('id:', id);
  console.log('token:', token);
  
  useEffect(() => {
    const cargarBranch = async () => {  // Cambia la función a asíncrona
      try {   
        setIsLoading(true);
        const branchData = await getBranch(id, token);  // Espera la promesa con await
        setBranch(branchData);
        console.log("branch:", branchData);

      } catch (error) {
        Alert.alert('Error al cargar la branch seleccionada', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    cargarBranch();
  }, [token]);

  return (
    <>
      <LoadingGlutty visible={isloading} color={Colors.vainilla} />
      <ConsultGeneralInfo branch={branch} />
    </>
  );
}*/

import { useSelector } from "react-redux";
import { ConsultGeneralInfo } from "./ConsultGeneralInfo";
import { getBranch } from "../../../../services/commerceService";
import { useState, useEffect } from "react";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../../../constants/colors";
import { Alert } from "react-native";
import TextCommonsRegular from "../../../../components/UI/FontsTexts/TextCommonsRegular";


export function ViewBranch({ route }) {
  const [branch, setBranch] = useState(undefined);
  const [isloading, setIsLoading] = useState(false);

  const id = route.params.branch.id;
  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const cargarBranch = async () => {
      console.log('Before try');
      try {
        console.log('Inside try');
        console.log('id:', id);
        console.log('token:', token);

        setIsLoading(true);
        const branchData = await getBranch(id, token);  // Espera la promesa con await
        setBranch(branchData);
        console.log("branch:", branchData);

      } catch (error) {
        console.error('Error caught in catch block:', error);
        Alert.alert('Error al cargar la branch seleccionada', error.message);
      } finally {
        setIsLoading(false);
      }
    }; 
    if (id && token) {  // Verifica que id y token estén definidos antes de llamar a la función
      cargarBranch();
    }
  }, [id, token]);

  return (
    <>
    <LoadingGlutty visible={isloading} />
    {branch ? (
      <ConsultGeneralInfo branch={branch} />
    ) : (
      <TextCommonsRegular>Cargando información de la sucursal...</TextCommonsRegular>
    )}
  </>
  )
}
