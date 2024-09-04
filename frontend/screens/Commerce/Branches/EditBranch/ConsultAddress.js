import BranchDataItem from "../../../../components/Branch/BranchDataItem";
import { View, StyleSheet, setFieldValue} from "react-native";
import TextCommonsRegular from "../../../../components/UI/FontsTexts/TextCommonsRegular";
import Form from "../../../../components/UI/Forms/Form";
import FormControl from "../../../../components/UI/Controls/FormControl";
import { Colors } from "../../../../constants/colors";

export function ConsultAddress({branch}) {
    console.log("branch", branch);
    return (
        <BranchDataItem title="Dirección" onPressPrencil={""}>
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
    )
};

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