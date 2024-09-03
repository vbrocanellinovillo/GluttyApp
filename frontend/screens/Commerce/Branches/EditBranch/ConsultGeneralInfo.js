import BranchDataItem from "../../../../components/Branch/BranchDataItem";
import { View, StyleSheet, setFieldValue} from "react-native";
import TextCommonsRegular from "../../../../components/UI/FontsTexts/TextCommonsRegular";
import Form from "../../../../components/UI/Forms/Form";
import FormControl from "../../../../components/UI/Controls/FormControl";
import PhoneInput from "../../../../components/UI/Controls/PhoneInput";
import CheckboxControl from "../../../../components/UI/Controls/CheckboxControl";

export function ConsultGeneralInfo({branch}) {
    console.log("branch", branch);
    return (
        <BranchDataItem title="Información General" onPressPrencil={""}>
            <View style={styles.datos}>
                <Form>
                    <FormControl
                    label="Nombre"
                    value={branch.name}
                    name="name"
                    //autoCapitalize="words"
                    />
                    
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
                    />
                    <CheckboxControl
                        title="Solo TakeAway"
                        name="onlyTakeAway"
                        checked={branch.just_takeaway}
                        setChecked={setFieldValue}
                        style={styles.checkbox}
                    />
                    </View>
                </Form>
            </View>     
        </BranchDataItem>
    )
};

const styles = StyleSheet.create({
    datos: {
        //marginVertical: 20,
        
    },
    checkboxServices: {
        flexDirection: "column",
        //justifyContent: "space-between",
        marginVertical: 10,
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