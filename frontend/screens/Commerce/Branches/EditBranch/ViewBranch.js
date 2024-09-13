import { useSelector } from "react-redux";
import { getBranch } from "../../../../services/commerceService";
import { useState, useEffect } from "react";
import { Colors } from "../../../../constants/colors";
import { ScrollView, StyleSheet } from "react-native";
import TextCommonsRegular from "../../../../components/UI/FontsTexts/TextCommonsRegular";
import { ConsultAddress } from "../../../../components/Branch/EditBranch/ConsultAddress";
import { ConsultGeneralInfo } from "../../../../components/Branch/EditBranch/ConsultGeneralInfo";
import { ConsultPhotos } from "../../../../components/Branch/EditBranch/ConsultPhotos";
import ViewBranchSkeleton from "../../../../components/UI/Loading/ViewBranchSkeleton";
import ErrorViewBranch from "../../../../components/Branch/ErrorViewBranch";

export function ViewBranch({ route }) {
  const [branch, setBranch] = useState(undefined);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const id = route.params.branch.id;
  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const cargarBranch = async () => {
      try {
        setIsLoading(true);
        const branchData = await getBranch(id, token); // Espera la promesa con await
        setBranch(branchData);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    if (id && token) {
      cargarBranch();
    }
  }, [id, token]);

  if (isloading) {
    return <ViewBranchSkeleton />;
  }

  if (!isloading && isError) {
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
          </ScrollView>
        </>
      )}
    </>
  );
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
    fontWeight: "bold",
    color: Colors.locro,
  },
});
