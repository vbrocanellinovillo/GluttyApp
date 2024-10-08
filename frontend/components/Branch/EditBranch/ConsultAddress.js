import BranchDataItem from "../BranchDataItem";
import { View, StyleSheet } from "react-native";
import Form from "../../UI/Forms/Form";
import FormControl from "../../UI/Controls/FormControl";
import { Colors } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";

export function ConsultAddress({ branch }) {
  const navigation = useNavigation();

  // Modificar para que la función reciba el objeto branch
  const handlePress = () => {
    navigation.navigate("EditBranchStack", { 
      screen: "EditAddress", 
      params: { branch }
    });
  };

  return (
    <BranchDataItem title="Dirección" onPressPrencil={handlePress}>
      <View style={styles.datos}>
        <Form>
          <FormControl
            label="Dirección"
            name="Direccion"
            value={branch.address} // Asegúrate de que el objeto branch tiene una propiedad 'address'
            editable={false}
            style={styles.direccion}
          />
        </Form>
      </View>
    </BranchDataItem>
  );
}

const styles = StyleSheet.create({
  datos: {
    marginVertical: 5,
  },
  direccion: {
    marginBottom: 10,
    fontSize: 16,
    color: Colors.locro,
    lineHeight: 24,
    textAlignVertical: "top",
  },
});
