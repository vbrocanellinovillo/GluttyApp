import { ScrollView, StyleSheet, View } from "react-native";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";
import { Colors } from "../../constants/colors";
import ButtonsOptions from "../UI/Controls/ButtonsOptions";
import { useState } from "react";
import FormHeader from "../UI/Forms/FormHeader";
import UserRegister from "./UserRegister";
import CommerceRegister from "./CommerceRegister";
import Form from "../UI/Forms/Form";

const OPTIONS = [
  { id: 1, value: "Persona Celíaca" },
  { id: 2, value: "Comercio" },
];

export default function RegisterForm({ onSubmit }) {
  const [selectedOption, setSelectedOption] = useState(1);

  function selectOption(id) {
    setSelectedOption(id);
  }

  return (
    <DismissKeyboardContainer>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <FormHeader title="GLUTTY" />
        <Form>
          <View style={styles.buttonsOptions}>
            <ButtonsOptions
              options={OPTIONS}
              onSelect={selectOption}
              selectedColor={Colors.humita}
              defaultColor="white"
            />
          </View>
          {selectedOption == 1 && <UserRegister onSubmit={onSubmit} />}
          {selectedOption == 2 && <CommerceRegister onSubmit={onSubmit} />}
        </Form>
      </ScrollView>
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
  },

  buttonsOptions: {
    marginBottom: 30,
  },
});
