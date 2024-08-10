import { ScrollView, StyleSheet, Text, View } from "react-native";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";
import { Colors } from "../../constants/colors";
import ButtonsOptions from "../UI/Controls/ButtonsOptions";
import { useRef, useState } from "react";
import UserRegister from "./UserRegister";
import CommerceRegister from "./CommerceRegister";
import Form from "../UI/Forms/Form";
import UserImage from "../UI/UserImage/UserImage";
import BottomSheet from "@devvie/bottom-sheet";

const OPTIONS = [
  { id: 1, value: "Persona Celíaca" },
  { id: 2, value: "Comercio" },
];

export default function RegisterForm({ onSubmit }) {
  const [selectedOption, setSelectedOption] = useState(1);
  const sheetRef = useRef();

  function openImageOptions() {
    sheetRef.current?.open();
  }

  function selectOption(id) {
    setSelectedOption(id);
  }

  return (
    <DismissKeyboardContainer>
      <>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <UserImage
            dimensions={150}
            style={styles.userImage}
            isForm
            onPress={openImageOptions}
          />
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
        <BottomSheet ref={sheetRef} height={200}>
          <Text>ni idea bro</Text>
        </BottomSheet>
      </>
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

  userImage: {
    marginBottom: 30,
  },
});
