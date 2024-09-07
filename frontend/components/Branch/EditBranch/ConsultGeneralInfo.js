import BranchDataItem from "../BranchDataItem";
import { View, StyleSheet, setFieldValue } from "react-native";
import TextCommonsRegular from "../../UI/FontsTexts/TextCommonsRegular";
import Form from "../../UI/Forms/Form";
import FormControl from "../../UI/Controls/FormControl";
import CheckboxControl from "../../UI/Controls/CheckboxControl";
import { useNavigation } from "@react-navigation/native";

export function ConsultGeneralInfo({ branch }) {
  const navigation = useNavigation();

  const handlePress = (branch) => {
    navigation.navigate("EditBranchStack", {
      screen: "EditGeneralInfo",
      params: { branch },
    });
  };

  return (
    <BranchDataItem
      title="Información General"
      onPressPrencil={() => handlePress(branch)}
    >
      <View style={styles.datos}>
        <Form>
          <View style={styles.inputs}>
            <FormControl
              label="Nombre"
              value={branch.name}
              name="name"
              style={styles.nombre}
              editable={false}
            />
            <FormControl
              //defaultCode={{ code: "+54", flag: "🇦🇷" }}
              label="Teléfono"
              value={branch.phone}
              name="phone"
              style={styles.phone}
              editable={false}
            />
            <FormControl
              //defaultCode={{ code: "+54", flag: "🇦🇷" }}
              label="Otro teléfono (opcional)"
              value={branch.optional_phone}
              name="optionalPhone"
              style={styles.optional_phone}
              editable={false}
            />
          </View>
          <View style={styles.checkboxServices}>
            <TextCommonsRegular style={styles.checkboxServicesText}>
              Servicios Ofrecidos
            </TextCommonsRegular>
            <CheckboxControl
              title="Cocina separada"
              name="separatedKitchen"
              checked={branch.separated_kitchen}
              setChecked={setFieldValue}
              style={styles.checkbox}
              editable={false}
            />
            <CheckboxControl
              title="Solo TakeAway"
              name="onlyTakeAway"
              checked={branch.just_takeaway}
              setChecked={setFieldValue}
              style={styles.checkbox}
              editable={false}
            />
          </View>
        </Form>
      </View>
    </BranchDataItem>
  );
}

const styles = StyleSheet.create({
  datos: {
    marginVertical: -5,
  },
  inputs: {
    marginBottom: -5,
  },
  nombre: {
    marginBottom: -10,
    fontSize: 15,
  },
  phone: {
    marginBottom: -10,
    fontSize: 15,
  },
  optional_phone: {
    marginBottom: -10,
    fontSize: 15,
  },
  checkboxServices: {
    flexDirection: "column",
    //justifyContent: "space-between",
    marginVertical: 15,
  },
  checkboxServicesText: {
    fontSize: 15,
  },
  checkbox: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
});
