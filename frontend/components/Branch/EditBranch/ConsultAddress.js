import BranchDataItem from "..//BranchDataItem";
import { View, StyleSheet } from "react-native";
import Form from "../../UI/Forms/Form";
import FormControl from "../../UI/Controls/FormControl";
import { Colors } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";

export function ConsultAddress({ branch }) {
  const navigation = useNavigation();

  const handlePress = (branch) => {
    navigation.navigate("EditBranchStack", { screen: "EditAddress" });
  };

  return (
    <BranchDataItem title="Dirección" onPressPrencil={handlePress}>
      <View style={styles.datos}>
        <Form>
          <FormControl
            label="Dirección"
            name="Direccion"
            value={branch.address}
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
