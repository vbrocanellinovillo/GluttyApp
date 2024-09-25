import WheelPicker from "@quidone/react-native-wheel-picker";
import { useState } from "react";
import { Pressable } from "react-native";
import TextCommonsRegular from "../FontsTexts/TextCommonsRegular";
import BlurContainer from "../BlurContainer";

export default function Picker({ data, value }) {
  const [visible, setVisible] = useState(false);

  function toggleVisible() {
    setVisible((prevVisible) => !prevVisible);
  }

  return (
    <>
      <Pressable onPress={toggleVisible}>
        <TextCommonsRegular>holis</TextCommonsRegular>
      </Pressable>
      <BlurContainer visible={visible} onDismiss={toggleVisible}>
        <WheelPicker data={data} />
      </BlurContainer>
    </>
  );
}
